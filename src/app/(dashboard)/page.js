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
import useUserData from "@/hooks/use-userdata";
import Spinner from "@/components/shared/Spinner";

const ProfilePage = () => {
  const { userData, loading, error } = useUserData();

  // if (loading) return <Spinner/>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container py-10 px-4">
   {userData ? <>
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
              {userData?.username }
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              {userData?.emp_type } |{" "}
              <span className="font-medium">{userData?.email }</span>
            </CardDescription>
            <Button
              variant="secondary"
              className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
            >
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
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
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Full Name:</span>
            <span className="text-gray-800">{userData?.username}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="text-gray-800">{userData?.email}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Employee Type:</span>
            <span className="text-gray-800">{userData?.emp_type }</span>
          </div>
        
         
        </CardContent>
      </Card>


   </>:<>
    <Spinner/>
   </>}
    
    </div>
  );
};

export default ProfilePage;
