"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReusableTable } from "@/components/shared/AppTable";

const LeaveApplicationPage = () => {
  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: 1,
      reason: "I am unwell and need medical leave.",
      status: "Pending",
    },
    {
      id: 2,
      reason: "Family emergency.",
      status: "Approved",
    },
  ]);

  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApplication = {
      id: leaveApplications.length + 1,
      reason,
      status: "Pending",
    };
    setLeaveApplications([...leaveApplications, newApplication]);
    setReason("");
  };

  const columns = [
    { accessorKey: "id", header: "Application ID" },
    { accessorKey: "reason", header: "Reason" },
    { accessorKey: "status", header: "Status" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 ">Leave Application</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <Textarea
          placeholder="Reason for leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
        />
        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
          Apply for Leave
        </Button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Leave Application Records</h2>
      <ReusableTable data={leaveApplications} columns={columns} isOption={false} />
    </div>
  );
};

export default LeaveApplicationPage;
