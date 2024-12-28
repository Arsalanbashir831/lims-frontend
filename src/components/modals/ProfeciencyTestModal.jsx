"use client";
import { useState, useEffect } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogOverlay } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Assuming Select is imported from ShadCN
import useApi from "@/hooks/use-api"; // Custom hook for API calls

// Options for category and test status
const CATEGORY_CHOICES = [
  { value: "GPT", label: "Global PT Provider" },
  { value: "DM", label: "Deep Metallurgy PT Provider" },
];

const TEST_STATUS = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

const ProfeciencyTestModal = ({ isOpen, onClose, mode, initialData, onSubmit }) => {
  const { callApi } = useApi();
  const [formData, setFormData] = useState({
    test_id: "",  // test_id will be selected via search
    test_start: "",
    category: "", // category default value
    test_status: "", // test_status default value
  });
  const [testMethods, setTestMethods] = useState([]);  // Holds test methods data
  const [searchTerm, setSearchTerm] = useState("");  // Search term for test methods
  const [filteredTestMethods, setFilteredTestMethods] = useState([]);  // Filtered test methods based on search

  // Fetch test methods data from API
  useEffect(() => {
    const fetchTestMethods = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const data = await callApi("/api/testmethods", "GET", "", {
          Authorization: `Bearer ${token}`,
        });
        setTestMethods(data);
        setFilteredTestMethods(data);  // Set filtered list initially as all test methods
      } catch (error) {
        console.error("Error fetching test methods:", error);
      }
    };

    fetchTestMethods();
  }, [callApi]);

  // Populate form data for edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        test_id: initialData.test_id || "",
        test_start: initialData.test_start || "",
        category: initialData.category || "",
        test_status: initialData.test_status || "",
      });
    }
  }, [mode, initialData]);

  // Handle input changes (for text fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle search term change for test methods
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    const filteredResults = testMethods.filter((method) =>
      method.test_name.toLowerCase().includes(value.toLowerCase()) ||
      method.test_id.toString().includes(value) // Include test_id in search filter
    );
    setFilteredTestMethods(filteredResults);
  };

  // Handle selecting a test method
  const handleSelectTestMethod = (selectedTest) => {
    setFormData((prev) => ({
      ...prev,
      test_id: selectedTest.test_id,
    }));
    setSearchTerm(selectedTest.test_name); // Set the search term to the selected test's name
  };

  // Handle the form submission (add/edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const requestData = {
      test_id: formData.test_id,
      test_start: formData.test_start,
      category: formData.category,
      test_status: formData.test_status,
    };

    try {
      if (mode === "add") {
        // Add proficiency test (POST)
        await callApi("/api/proficiency_testing/", "POST", requestData, {
          Authorization: `Bearer ${token}`,
        });
      } else if (mode === "edit") {
        // Edit proficiency test (PUT)
        await callApi(`/api/proficiency_testing/${initialData.schedule_id}/`, "PUT", requestData, {
          Authorization: `Bearer ${token}`,
        });
      }

      onSubmit(requestData); // Pass the data back to the parent component
      
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error submitting proficiency test data:", error);
      alert("There was an error submitting the data.");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === "edit" ? "Edit Proficiency Test" : "Add Proficiency Test"}</AlertDialogTitle>
          <AlertDialogDescription>
            {mode === "edit"
              ? "Edit the proficiency test details below."
              : "Fill in the details to add a new proficiency test."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Test ID Searchable Dropdown */}
            <div>
              <Label htmlFor="test_id">Test ID</Label>
              <Input
                id="test_id"
                name="test_id"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for a test"
                required
              />
              <div className="mt-2">
                {/* Display filtered test methods list */}
                {filteredTestMethods.length > 0 && (
                  <div className="bg-white border mt-2 rounded shadow-md max-h-60 overflow-y-auto">
                    {filteredTestMethods.map((test) => (
                      <div
                        key={test.test_id}
                        className="cursor-pointer p-2 hover:bg-gray-200"
                        onClick={() => handleSelectTestMethod(test)} // Set the selected test_id
                      >
                        {test.test_name} ({test.test_id})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Test Start Date */}
            <div>
              <Label htmlFor="test_start">Test Start Date</Label>
              <Input
                id="test_start"
                name="test_start"
                type="date"
                value={formData.test_start}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category Selection */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                name="category"
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_CHOICES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Test Status Selection */}
            <div>
              <Label htmlFor="test_status">Test Status</Label>
              <Select
                id="test_status"
                name="test_status"
                value={formData.test_status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, test_status: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {TEST_STATUS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <AlertDialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {mode === "edit" ? "Save Changes" : "Add Proficiency Test"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfeciencyTestModal;
