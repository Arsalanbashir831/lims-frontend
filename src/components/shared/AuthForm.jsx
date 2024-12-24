'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const AuthForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50">
 
      <Card className="w-full max-w-lg bg-white shadow-xl border border-gray-300 rounded-lg">
        <CardHeader className="text-center py-6">
          <CardTitle className="flex justify-center items-center">
         
            <img
              src="/gripco_logo.svg" 
              alt="Logo"
              className="h-auto w-auto"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <Button type="submit" className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
              Sign In
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter className="text-center py-4">
          <p className="text-sm text-gray-500">
            Don’t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default AuthForm;
