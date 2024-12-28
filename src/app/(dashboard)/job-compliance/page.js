"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge, CheckCircle } from "lucide-react";
import useApi from "@/hooks/use-api"; 

const JobListPage = () => {
  const router = useRouter();
  const { callApi } = useApi(); 
  const [data, setData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isCompiledFilter, setIsCompiledFilter] = useState(false); 

  // Fetch data on initial load or when isCompiledFilter is changed
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        // Fetch the job data from the API based on filter
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

  // Filtering jobs by search term and isCompiled filter
  const filteredJobs = data.filter((job) => {
    const matchesSearch = searchTerm === "" || job.job_id.toString().includes(searchTerm);
    const matchesStatus = isCompiledFilter===false || job.isCompiled.toString() === isCompiledFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle job details navigation
  const navigateToDetails = (jobId) => {
    router.push(`/job-details/${jobId}`);
  };

  // Handle test compliance action
  const handleTestCompliance = (jobId) => {
    console.log(`Testing compliance for Job ID: ${jobId}`);
    router.push(`/dashboard/job-compliance?jobId=${jobId}`);
  };
  const handleTestCheckList = (jobId) => {
    console.log(`Testing compliance for Job ID: ${jobId}`);
    router.push(`/dashboard/create-checklist?jobId=${jobId}`);
  };

  // Handle certificate navigation
  const navigateToCertificate = (jobId) => {
    router.push(`/dashboard/test-certificates?jobId=${jobId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Job List</h1>

      {/* Search and Filter Section */}
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Search by Job ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-blue-200 focus:ring-blue-500"
        />
        {/* Filter Dropdown for isCompiled */}
        <select
          value={isCompiledFilter}
          onChange={(e) => setIsCompiledFilter(e.target.value)}
          className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
        >
          {/* <option value="all">All Jobs</option> */}
          <option value="true">Compiled</option>
          <option value="false">Uncompiled</option>
        </select>
        <Button
          onClick={() => {
            setSearchTerm("");
            setIsCompiledFilter("all");
          }}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Reset
        </Button>
      </div>

      {/* Job List Section */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <DropdownMenu key={job.job_id}>
            <DropdownMenuTrigger asChild>
              <Card className="p-6 bg-blue-50 border border-blue-200 cursor-pointer rounded-lg">
                <h2 className="text-xl font-semibold">Job ID: {job.job_id}</h2>
                <p className="text-blue-600">Status: {job.job_status}</p>
                <div>
                  <ul>
                    {job.job_data?.tests?.map((test, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        <strong>{test.selected_test.test_name}</strong> - {test.task_description}
                        <br />
                        <small className="text-gray-500">
                          {test.selected_test.test_description}
                        </small>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md p-2">
              <DropdownMenuItem
                onClick={() => handleTestCompliance(job.job_id)}
                className="flex items-center gap-2 hover:bg-blue-50 cursor-pointer rounded-md px-3 py-2"
              >
                <CheckCircle size={18} /> Test Compliance
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleTestCheckList(job.job_id)}
                className="flex items-center gap-2 hover:bg-blue-50 cursor-pointer rounded-md px-3 py-2"
              >
                <CheckCircle size={18} /> Create Checklist
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigateToCertificate(job.job_id)}
                className="flex items-center gap-2 hover:bg-blue-50 cursor-pointer rounded-md px-3 py-2"
              >
                <Badge size={18} /> Certificates
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </div>
  );
};

export default JobListPage;
