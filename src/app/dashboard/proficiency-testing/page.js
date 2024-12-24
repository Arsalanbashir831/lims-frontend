"use client";
import { ReusableTable } from "@/components/shared/AppTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";

const page = () => {
  const data = [
    {
      schedule_id: 1,
      test_id: 1,
      test_name: "Chemical Analysis OES",
      test_start: "2024-12-30",
      category: "GPT",
      test_status: "pending",
    },
  ];

  const columns = [
    {
      accessorKey: "test_id",
      header: "Test ID",
    },
    {
      accessorKey: "test_name",
      header: "Test Name",
    },
    {
      accessorKey: "test_start",
      header: "Test Start Date",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "test_status",
      header: "Status",
    },
  ];

  return (
    <div className="min-h-screen flex items-start justify-center py-10">
      <div className="max-w-7xl w-full rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Proficiency Testing
        </h1>
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
          >
            <PlusCircle className="mr-2" />
            Add Schedule
          </Button>
        </div>
        <ReusableTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default page;
