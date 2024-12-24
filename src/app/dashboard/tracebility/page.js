"use client";

import React from "react";
import { ReusableTable } from "@/components/shared/AppTable";

const page = () => {
  const data = [
    {
      job_id: 3,
      job_status: "technician",
      isCompiled: false,
      tests: [
        {
          test_name: "Sample Test 1",
          test_description: "This is a description for Sample Test 1.",
        },
        {
          test_name: "Sample Test 2",
          test_description: "This is a description for Sample Test 2.",
        },
      ],
    },
    {
      job_id: 4,
      job_status: "supervisor",
      isCompiled: false,
      tests: [
        {
          test_name: "Sample Test 1",
          test_description: "This is a description for Sample Test 1.",
        },
        {
          test_name: "Sample Test 2",
          test_description: "This is a description for Sample Test 2.",
        },
      ],
    },
  ];

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
      header: "Is Compiled",
      cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
    },
    {
      accessorKey: "tests",
      header: "Test Details",
      cell: ({ getValue }) => (
        <ul>
          {getValue().map((test, index) => (
            <li key={index}>
              <strong>{test.test_name}:</strong> {test.test_description}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white  rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Jobs </h1>
      <ReusableTable isOption={false} data={data} columns={columns} />
    </div>
  );
};

export default page;
