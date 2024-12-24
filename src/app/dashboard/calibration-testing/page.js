"use client";
import { ReusableTable } from "@/components/shared/AppTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";

const page = () => {
  const data = [
    {
      id: 1,
      calibrated_by: "John Doe",
      calibration_certification_number: "CERT123456",
      calibration_date: "2024-12-15",
      calibration_due_date: "2025-12-15",
      remarks: "Calibration performed successfully.",
      created_at: "2024-12-23T08:30:15.927976Z",
      updated_at: "2024-12-23T08:30:15.927976Z",
      instrument: 1,
    },
  ];

  const columns = [
    {
      accessorKey: "id",
      header: "Calibration ID",
    },
    {
      accessorKey: "calibrated_by",
      header: "Calibrated By",
    },
    {
      accessorKey: "calibration_certification_number",
      header: "Certification Number",
    },
    {
      accessorKey: "calibration_date",
      header: "Calibration Date",
    },
    {
      accessorKey: "calibration_due_date",
      header: "Due Date",
    },
    {
      accessorKey: "remarks",
      header: "Remarks",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
    },
  ];

  return (
    <div className="min-h-screen flex items-start justify-center py-10">
      <div className="max-w-7xl w-full rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Calibration Records
        </h1>
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
          >
            <PlusCircle className="mr-2" />
            Add Calibration Record
          </Button>
        </div>
        <ReusableTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default page;
