"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReusableTable } from "@/components/shared/AppTable";
import useApi from "@/hooks/use-api"; // Assuming this is a custom hook to manage API calls

const AttendancePage = () => {
  const { callApi } = useApi();
  const [attendanceData, setAttendanceData] = useState([]);
  const [formData, setFormData] = useState({
    reporting_time: "",
    checkout_time: "",
    working_hours: "",
    overtime_hours: "",
  });

  // Fetch attendance data from the API
  useEffect(() => {
    const fetchAttendanceData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const data = await callApi("/api/attendance/", "GET", "", {
          Authorization: `Bearer ${token}`,
        });
        setAttendanceData(data); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchAttendanceData();
  }, [callApi]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const requestData = {
      reporting_time: formData.reporting_time,
      checkout_time: formData.checkout_time,
      working_hours: formData.working_hours,
      overtime_hours: formData.overtime_hours,
      is_approved: "pending",  // Automatically set status to 'pending' when submitting
    };

    try {
      // Send POST request to add attendance
      await callApi("/api/attendance/", "POST", requestData, {
        Authorization: `Bearer ${token}`,
      });

      // Optionally refetch attendance data to include the new entry
      const data = await callApi("/api/attendance/", "GET", "", {
        Authorization: `Bearer ${token}`,
      });
      setAttendanceData(data); // Update the state with the new data

      // Clear the form
      setFormData({
        reporting_time: "",
        checkout_time: "",
        working_hours: "",
        overtime_hours: "",
      });
    } catch (error) {
      console.error("Error submitting attendance data:", error);
      alert("There was an error submitting the data.");
    }
  };

  const columns = [
    { accessorKey: "reporting_time", header: "Reporting Time" },
    { accessorKey: "checkout_time", header: "Checkout Time" },
    { accessorKey: "working_hours", header: "Working Hours" },
    { accessorKey: "overtime_hours", header: "Overtime Hours" },
    { accessorKey: "is_approved", header: "Status" }, // Showing approval status here
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Attendance Management</h1>

      {/* Form to add attendance */}
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

      {/* Render the attendance data table */}
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      <ReusableTable data={attendanceData} columns={columns} isOption={false} />
    </div>
  );
};

export default AttendancePage;
