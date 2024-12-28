"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import useApi from "@/hooks/use-api";
import { useRouter } from "next/navigation";


const AuthForm = () => {
  const { callApi, loading } = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
       await callApi("/api/login", "POST", { email, password }).then((data)=>{
              localStorage.setItem("accessToken", data.tokens.access);
        localStorage.setItem("refreshToken", data.tokens.refresh);
        localStorage.setItem("userId", data.user_id);
        router.push('/')
      })
     
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50">
      <Card className="w-full max-w-lg bg-white shadow-xl border border-gray-300 rounded-lg">
        <CardHeader className="text-center py-6">
          <CardTitle className="flex justify-center items-center">
            <img src="/gripco_logo.svg" alt="Logo" className="h-auto w-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {typeof error === "string" ? error : JSON.stringify(error)}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
