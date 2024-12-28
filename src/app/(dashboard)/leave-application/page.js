"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReusableTable } from "@/components/shared/AppTable";
import useApi from "@/hooks/use-api"; // Assuming you have a custom hook for API calls
import { Label } from "@/components/ui/label";
// Make sure you're importing the Select components correctly
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const LeaveApplicationPage = () => {
  const { callApi } = useApi();
  const [leaveApplications, setLeaveApplications] = useState([]); // State to store fetched leave applications
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    reason: "",
    is_approved: "pending", // Default status is pending
  });

  // Fetch leave applications from the API
  useEffect(() => {
    const fetchLeaveApplications = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await callApi("/api/leaveapplications/", "GET", "", {
          Authorization: `Bearer ${token}`,
        });
        setLeaveApplications(response); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching leave applications:", error);
      }
    };

    fetchLeaveApplications();
  }, [callApi]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for adding a leave application
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const requestData = {
      start_date: formData.start_date,
      end_date: formData.end_date,
      reason: formData.reason,
      is_approved: formData.is_approved,
    };

    try {
      // POST request to create a new leave application
      await callApi("/api/leaveapplications/", "POST", requestData, {
        Authorization: `Bearer ${token}`,
      });

      // Refetch leave applications after submission
      const response = await callApi("/api/leaveapplications/", "GET", "", {
        Authorization: `Bearer ${token}`,
      });
      setLeaveApplications(response); // Update the state with the new data

      // Clear the form
      setFormData({
        start_date: "",
        end_date: "",
        reason: "",
        is_approved: "pending",
      });
    } catch (error) {
      console.error("Error submitting leave application:", error);
      alert("There was an error submitting the leave application.");
    }
  };

  // Define columns for the table
  const columns = [
    // { accessorKey: "id", header: "Application ID" },
    { accessorKey: "start_date", header: "Start Date" },
    { accessorKey: "end_date", header: "End Date" },
    { accessorKey: "reason", header: "Reason" },
    { accessorKey: "is_approved", header: "Status" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Leave Application</h1>

      {/* Form to apply for leave */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            required
            className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="end_date">End Date</Label>
          <Input
            type="date"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            required
            className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="reason">Reason for Leave</Label>
          <Textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
            className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
          />
        </div>

        {/* <div>
          <Label htmlFor="is_approved">Approval Status</Label>
          <Select
            id="is_approved"
            name="is_approved"
            value={formData.is_approved}
            onChange={handleInputChange}
            required
            className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
          Apply for Leave
        </Button>
      </form>

      {/* Display leave application records in a table */}
      <h2 className="text-2xl font-bold mb-4">Leave Application Records</h2>
      <ReusableTable data={leaveApplications} columns={columns} isOption={false} />
    </div>
  );
};

export default LeaveApplicationPage;
