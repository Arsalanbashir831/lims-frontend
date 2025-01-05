"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User2, FileText } from "lucide-react";
import useUserData from "@/hooks/use-userdata";
import Spinner from "@/components/shared/Spinner";

const ProfilePage = () => {
  const { userData, loading, error } = useUserData();

  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Fields to display (including file fields)
  const userFields = [
    { label: "Full Name", key: "username" },
    { label: "Email", key: "email" },
    { label: "Employee Type", key: "emp_type" },
    { label: "Employee ID", key: "employee_id" },
    { label: "Gender", key: "gender" },
    { label: "Marital Status", key: "marital_status" },
    { label: "Nationality", key: "nationality" },
    { label: "Branch Name", key: "branch_name" },
    { label: "Department", key: "department" },
    { label: "Position", key: "position" },
    { label: "Contract Type", key: "contract_type" },
    { label: "Joining Date", key: "joining_date" },
    { label: "Employment Status", key: "employment_status" },
    { label: "Line Manager", key: "line_manager" },
    { label: "Contract Duration (months)", key: "contract_duration" },
    { label: "Contract Issuance Date", key: "contract_issuance_date" },
    { label: "Contract Expiry Date", key: "contract_expiry_date" },
    { label: "Contracted Hours per Day", key: "contracted_hours_per_day" },
    { label: "Basic Salary", key: "basic_salary" },
    { label: "House Allowance", key: "house_allowance" },
    { label: "Transport Allowance", key: "transport_allowance" },
    { label: "Food Allowance", key: "food_allowance" },
    { label: "Other Allowance", key: "other_allowance" },
    { label: "GOSI Salary", key: "gosi_salary" },
    { label: "Total Salary", key: "total_salary" },
    { label: "Overtime Type", key: "overtime_type" },
    { label: "Overtime Hourly Rate", key: "overtime_hourly_rate" },
    { label: "Leave Entitlement", key: "leave_entitlement" },
    { label: "GOSI Number", key: "gosi_number" },
    { label: "Saudi Arrival Date", key: "saudi_arrival_date" },
    { label: "ID Type", key: "id_type" },
    { label: "ID Number", key: "id_number" },
    { label: "Name in ID (English)", key: "name_in_id_english" },
    { label: "Name in ID (Arabic)", key: "name_in_id_arabic" },
    { label: "ID Issue Date", key: "id_issue_date" },
    { label: "ID Expiry Date", key: "id_expiry_date" },
    { label: "ID Issue Place", key: "id_issue_place" },
    { label: "Iqama Profession", key: "iqama_profession" },
    { label: "Passport Number", key: "passport_number" },
    { label: "Passport Name", key: "passport_name" },
    { label: "Passport Issue Date", key: "passport_issue_date" },
    { label: "Passport Expiry Date", key: "passport_expiry_date" },
    { label: "Passport Issue Place", key: "passport_issue_place" },
    { label: "Local Driving License Number", key: "local_driving_license_number" },
    { label: "Local Driving License Expiry", key: "local_driving_license_expiry" },
    { label: "Bank Name", key: "bank_name" },
    { label: "Account Number", key: "account_number" },
    { label: "IBAN", key: "iban" },
  ];

  // File fields
  const fileFields = [
    { label: "Profile Picture", key: "profile_picture" },
    { label: "ID File", key: "id_file" },
    { label: "Passport File", key: "passport_file" },
    { label: "Local Driving License File", key: "local_driving_license_file" },
  ];

  return (
    <div className="container py-10 px-4">
      {userData ? (
        <>
          {/* Profile Card */}
          <Card className="mb-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl">
            <CardHeader className="flex flex-row space-x-6 px-6 py-6">
              <Avatar className="w-28 h-28 border-4 border-white rounded-full shadow-md">
                <AvatarImage src={userData?.profile_picture} alt="User Profile" />
                <AvatarFallback>
                  {userData?.profile_picture ? (
                    <img src={userData?.profile_picture} alt="User Profile" />
                  ) : (
                    <User2 size={80} />
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold text-gray-800">
                  {userData?.username || "N/A"}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {userData?.emp_type || "N/A"} |{" "}
                  <span className="font-medium">{userData?.email || "N/A"}</span>
                </CardDescription>
                {/* <Button
                  variant="secondary"
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
                >
                  Edit Profile
                </Button> */}
              </div>
            </CardHeader>
          </Card>

          {/* Personal Information Section */}
          <Card className="mb-6 bg-white rounded-lg shadow-xl">
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Personal Information
              </CardTitle>
              <CardDescription className="text-gray-500">
                Basic details about the user
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-6 py-4">
              {userFields.map((field) =>
                userData?.[field.key] ? (
                  <div key={field.key} className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">{field.label}:</span>
                    <span className="text-gray-800">{userData?.[field.key] || "N/A"}</span>
                  </div>
                ) : null
              )}
              <Separator />
              {fileFields.map((field) =>
                userData?.[field.key] ? (
                  <div key={field.key} className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">{field.label}:</span>
                    <a href={userData?.[field.key]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      <FileText size={20} /> Download
                    </a>
                  </div>
                ) : null
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ProfilePage;
