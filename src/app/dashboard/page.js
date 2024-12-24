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
import { User2 } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="container py-10 px-4">
      {/* Profile Header */}
      <Card className="mb-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl">
        <CardHeader className="flex flex-row  space-x-6 px-6 py-6">
          <Avatar className="w-28 h-28 border-4 border-white rounded-full shadow-md">
            <AvatarImage src="/profile-placeholder.jpg" alt="User Profile" />
            <AvatarFallback> <User2 size={80}/> </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl font-bold text-gray-800">
              John Doe
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Sales  | <span className="font-medium">john.doe@example.com</span>
            </CardDescription>
            <Button variant="secondary" className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900">
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card className="mb-6 bg-white rounded-lg shadow-xl">
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">Personal Information</CardTitle>
          <CardDescription className="text-gray-500">
            Basic details about the user
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Full Name:</span>
            <span className="text-gray-800">John Doe</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="text-gray-800">john.doe@example.com</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Phone:</span>
            <span className="text-gray-800">+1 234 567 890</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Address:</span>
            <span className="text-gray-800">123 Main St, Springfield</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
