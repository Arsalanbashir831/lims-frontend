"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { testMethodsData } from "@/data/TestData";
import { FileUpIcon, PlusCircleIcon } from "lucide-react";

const AddJobForm = () => {
  const [testMethods, setTestMethods] = useState(testMethodsData);
  const [formData, setFormData] = useState({
    client_name: "",
    client_contact: "",
    client_address: "",
    tests: [],
  });
  const [currentTest, setCurrentTest] = useState({
    selected_test: null,
    task_description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentTestChange = (e) => {
    const { name, value } = e.target;
    setCurrentTest((prev) => ({ ...prev, [name]: value }));
  };

  const addTest = () => {
    if (currentTest.selected_test && currentTest.task_description) {
      setFormData((prev) => ({
        ...prev,
        tests: [...prev.tests, currentTest],
      }));
      setCurrentTest({ selected_test: null, task_description: "" });
    }
  };

  const removeTest = (index) => {
    setFormData((prev) => ({
      ...prev,
      tests: prev.tests.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    const payload = {
      client_data: {
        client_name: formData.client_name,
        client_contact: formData.client_contact,
        client_address: formData.client_address,
      },
      job_data: {
        tests: formData.tests,
      },
    };
    console.log("Submitting Payload:", payload);
    // Add API call to submit the form data
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Job</h1>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="client_name">Client Name</Label>
          <Input
            id="client_name"
            name="client_name"
            placeholder="John Doe"
            value={formData.client_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="client_contact">Client Contact</Label>
          <Input
            id="client_contact"
            name="client_contact"
            placeholder="john.doe@example.com"
            value={formData.client_contact}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="client_address">Client Address</Label>
          <Textarea
            id="client_address"
            name="client_address"
            placeholder="123 Elm Street, Springfield, USA"
            value={formData.client_address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="selected_test">Select Test Method</Label>
          <Select
            onValueChange={(value) => {
              const selectedTest = testMethods.find((test) => test.test_id === parseInt(value));
              setCurrentTest((prev) => ({ ...prev, selected_test: selectedTest }));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a test method" />
            </SelectTrigger>
            <SelectContent>
              {testMethods.map((test) => (
                <SelectItem key={test.test_id} value={test.test_id.toString()}>
                  {test.test_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="task_description">Task Description</Label>
          <Textarea
            id="task_description"
            name="task_description"
            placeholder="Describe the task for this test method"
            value={currentTest.task_description}
            onChange={handleCurrentTestChange}
          />
        </div>
        <div>
          <Button onClick={addTest} className="bg-green-500 text-white hover:bg-green-600">
            Add Test
          </Button>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Added Tests</h2>
          <div className="space-y-2">
            {formData.tests.map((test, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm"
              >
                <div>
                  <p className="font-medium">{test.selected_test.test_name}</p>
                  <p className="text-sm text-gray-600">{test.task_description}</p>
                </div>
                <Button
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-100"
                  onClick={() => removeTest(index)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center ">
          <Button onClick={handleSubmit} className="w-full bg-blue-500 text-white hover:bg-blue-600">
            <FileUpIcon/> Submit Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
