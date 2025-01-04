'use client'
import CertificateComponent from '@/components/shared/certificate/CertificateComponent'

import React, { Suspense, useEffect, useState } from "react";
import Spinner from "@/components/shared/Spinner";
import useApi from "@/hooks/use-api";
import { useSearchParams } from "next/navigation";
const page = () => {
    const [currJobData, setCurrJobData] = useState(null);
  const { callApi, loading } = useApi();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

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
    // console.log(currJobData?.client_data?.client_name);
  return (
    <div>
    <Suspense fallback={<p>Loading...</p>}>
        <CertificateComponent reportData={currJobData}/>
    </Suspense>
    </div>
  )
}

export default page