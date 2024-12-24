"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    console.log("Password change submitted:", formData);
    // Add API call to handle password change here
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg ">
      <h1 className="text-3xl font-bold mb-6 ">Settings</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleInputChange}
          required
          className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
        />
        <Input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleInputChange}
          required
          className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          className="border border-blue-200 rounded-md px-4 py-2 focus:ring-blue-500"
        />
        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
