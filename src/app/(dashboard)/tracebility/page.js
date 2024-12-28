"use client";

import React, { useState, useEffect } from "react";
import { ReusableTable } from "@/components/shared/AppTable";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/use-api"; // Custom hook for API calls

const page = () => {
  const { callApi } = useApi(); // Custom hook for API calls
  const [data, setData] = useState([]);
  const [isCompiledFilter, setIsCompiledFilter] = useState(false); // Filter state for isCompiled

  // Fetch data on initial load or when isCompiledFilter changes
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await callApi(`/api/test_compliance/?isCompiled=${isCompiledFilter}`, "GET", "", {
          Authorization: `Bearer ${token}`,
        });
        setData(response); // Set the response data to the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [isCompiledFilter, callApi]);

  // Columns for the table
  const columns = [
    {
      accessorKey: "job_id",
      header: "Job ID",
    },
    {
      accessorKey: "job_status",
      header: "Job Status",
    },
    {
      accessorKey: "isCompiled",
      header: "Compiled",
      cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
    },
    {
      accessorKey: "job_data",
      header: "Test Details",
      cell: ({ getValue }) => {
        const tests = getValue()?.tests; // Accessing the tests array inside job_data
        return (
          <ul>
            {tests?.map((test, index) => (
              <li key={index}>
                <strong>{test.selected_test.test_name}:</strong> {test.task_description}
              </li>
            ))}
          </ul>
        );
      },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Jobs</h1>

      {/* Filter Dropdown for isCompiled */}
      <div className="mb-4">
        <Select
          onValueChange={(value) => setIsCompiledFilter(value === "true")}
          defaultValue={isCompiledFilter.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Compilation Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="false">Uncompiled</SelectItem>
            <SelectItem value="true">Compiled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Render the table with the fetched data */}
      <ReusableTable isOption={false} data={data} columns={columns} />
    </div>
  );
};

export default page;
