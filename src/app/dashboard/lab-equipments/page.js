"use client";
import { ReusableTable } from "@/components/shared/AppTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";

const page = () => {
  const data = [
    {
      list_id: 1,
      instrument_id: "INST12345",
      equipment_name: "Centrifuge",
      manufacturer_name: "TechCorp",
      model_name: "CX-2000",
      serial_number: "SN987654",
      date_of_manufacture: "2021-07-15",
      created_at: "2024-12-23T08:21:19.882229Z",
      updated_at: "2024-12-23T08:21:19.882229Z",
    },
  ];

  const columns = [
    {
      accessorKey: "list_id",
      header: "List ID",
    },
    {
      accessorKey: "instrument_id",
      header: "Instrument ID",
    },
    {
      accessorKey: "equipment_name",
      header: "Equipment Name",
    },
    {
      accessorKey: "manufacturer_name",
      header: "Manufacturer Name",
    },
    {
      accessorKey: "model_name",
      header: "Model Name",
    },
    {
      accessorKey: "serial_number",
      header: "Serial Number",
    },
    {
      accessorKey: "date_of_manufacture",
      header: "Date of Manufacture",
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
    <div className="min-h-screen  flex items-start justify-center py-10">
      <div className="max-w-7xl w-full   rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Equipment Inventory
        </h1>
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
          >
            <PlusCircle/> Add Equipments
          </Button>
        </div>
        <ReusableTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default page;
