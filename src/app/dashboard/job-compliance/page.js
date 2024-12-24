"use client";

import React, { useState } from "react";
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
import { Badge, CheckCircle, Info } from "lucide-react";

const JobListPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const jobs = [
    {
      job_id: 3,
      job_status: "technician",
      job_data: {
        test_methods: [
          { test_name: "Sample Test 1" },
          { test_name: "Sample Test 2" },
        ],
      },
      isCompiled: false,
    },
    {
      job_id: 4,
      job_status: "supervisor",
      job_data: {
        test_methods: [
          { test_name: "Sample Test 1" },
          { test_name: "Sample Test 2" },
        ],
      },
      isCompiled: false,
    },
  ];

  const handleTestCompliance = (jobId) => {
    console.log(`Testing compliance for Job ID: ${jobId}`);
    // Add logic for testing compliance here
    ///dashboard/job-compliance
  };

  const navigateToDetails = (jobId) => {
    router.push(`/job-details/${jobId}`);
  };

  const navigateToCertificate = (jobId) => {
    router.push(`/dashboard/test-certificates/${jobId}`);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchTerm === "" || job.job_id.toString().includes(searchTerm);
    const matchesStatus =
      filterStatus === "all" || job.job_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg ">
      <h1 className="text-3xl font-bold mb-6 ">Job List</h1>
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Search by Job ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-blue-200 focus:ring-blue-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="technician">Technician</option>
          <option value="supervisor">Supervisor</option>
        </select>
        <Button
          onClick={() => {
            setSearchTerm("");
            setFilterStatus("all");
          }}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Reset
        </Button>
      </div>
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <DropdownMenu key={job.job_id}>
            <DropdownMenuTrigger asChild>
              <Card className="p-6 bg-blue-50 border border-blue-200 cursor-pointer  rounded-lg">
                <h2 className="text-xl font-semibold ">Job ID: {job.job_id}</h2>
                <p className="text-blue-600">Status: {job.job_status}</p>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md p-2">
              <DropdownMenuItem
                onClick={() => handleTestCompliance(job.job_id)}
                className="flex items-center gap-2  hover:bg-blue-50 cursor-pointer rounded-md px-3 py-2"
              >
                <CheckCircle size={18} /> Test Compliance
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigateToDetails(job.job_id)}
                className="flex items-center gap-2  hover:bg-blue-50 cursor-pointer rounded-md px-3 py-2"
              >
                <Info size={18} /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigateToCertificate(job.job_id)}
                className="flex items-center gap-2  hover:bg-blue-50 cursor-pointer rounded-md px-3 py-2"
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
