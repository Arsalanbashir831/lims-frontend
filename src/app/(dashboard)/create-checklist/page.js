"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import AppDynamicTable from "@/components/shared/AppDynamicTable";
import useApi from "@/hooks/use-api";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [currJobData, setCurrJobData] = useState(null);
  const { callApi, loading } = useApi();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const isPreview = searchParams.get("preview") === "true";

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const data = await callApi(`/api/test_compliance/${jobId}/`, "GET", "", {
          Authorization: `Bearer ${token}`,
        });
        setCurrJobData(data);
      } catch (error) {
        console.error("Failed to fetch job data:", error);
      }
    };
    fetchJob();
  }, []);

  const handleTableSubmit = (index, data) => {
    setCurrJobData((prevData) => {
        const updatedChecklist = prevData.job_data.supervisor_checklist
            ? [...prevData.job_data.supervisor_checklist]
            : [];

        updatedChecklist[index] = {
            ...(updatedChecklist[index] || {}),
            checklist: data,
        };

        return {
            ...prevData,
            job_data: {
                ...prevData.job_data,
                supervisor_checklist: updatedChecklist,
            },
        };
    });
};

  const handleSubmitAll = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("Submitting the following payload:", currJobData);

    await callApi(
      `/api/test_compliance/${jobId}/`,
      "PUT",
      {
        ...currJobData,
        job_status: "technician",
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
      .then(() => {
        alert("Payload submitted successfully.");
      })
      .catch(() => {
        alert("Error in submission.");
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading || !currJobData ? (
        <Spinner />
      ) : (
        <div>
          {currJobData.job_data.tests.map((test, index) => (
            <div
              key={test.selected_test.test_id}
              className="mb-8 p-4 bg-white shadow rounded"
            >
              <h2 className="text-lg font-bold mb-2 text-blue-900">
                Test {index + 1}: {test.selected_test.test_name}
              </h2>
              <p className="mb-2 text-gray-700">
                Description: {test.selected_test.test_description}
              </p>
              <p className="mb-4 text-gray-700">
                Task: {test.task_description}
              </p>
              <AppDynamicTable
                onSubmit={(data) => handleTableSubmit(index, data)}
                isPreview={isPreview}
                rows={
  isPreview
    ? currJobData?.job_data?.supervisor_checklist?.[index]?.checklist || []
    : []
}
              />
            </div>
          ))}
          {!isPreview && (
            <Button
              onClick={handleSubmitAll}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
              Submit All Data
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
