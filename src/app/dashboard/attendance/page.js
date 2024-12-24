"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReusableTable } from "@/components/shared/AppTable";

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([
    {
      reporting_time: "09:00:00",
      checkout_time: "17:30:00",
      working_hours: 8.5,
      overtime_hours: 0.5,
      status: "Approved",
    },
  ]);

  const [formData, setFormData] = useState({
    reporting_time: "",
    checkout_time: "",
    working_hours: "",
    overtime_hours: "",
    status: "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttendanceData([...attendanceData, formData]);
    setFormData({
      reporting_time: "",
      checkout_time: "",
      working_hours: "",
      overtime_hours: "",
      status: "Pending",
    });
  };

  const columns = [
    { accessorKey: "reporting_time", header: "Reporting Time" },
    { accessorKey: "checkout_time", header: "Checkout Time" },
    { accessorKey: "working_hours", header: "Working Hours" },
    { accessorKey: "overtime_hours", header: "Overtime Hours" },
    { accessorKey: "status", header: "Status" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 ">Attendance Management</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <Input
          type="time"
          name="reporting_time"
          placeholder="Reporting Time"
          value={formData.reporting_time}
          onChange={handleInputChange}
          required
          className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
        />
        <Input
          type="time"
          name="checkout_time"
          placeholder="Checkout Time"
          value={formData.checkout_time}
          onChange={handleInputChange}
          required
          className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
        />
        <Input
          type="number"
          step="0.01"
          name="working_hours"
          placeholder="Working Hours"
          value={formData.working_hours}
          onChange={handleInputChange}
          required
          className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
        />
        <Input
          type="number"
          step="0.01"
          name="overtime_hours"
          placeholder="Overtime Hours"
          value={formData.overtime_hours}
          onChange={handleInputChange}
          required
          className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
        />
        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
          Add Attendance
        </Button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      <ReusableTable data={attendanceData} columns={columns} isOption={false} />
    </div>
  );
};

export default AttendancePage;
