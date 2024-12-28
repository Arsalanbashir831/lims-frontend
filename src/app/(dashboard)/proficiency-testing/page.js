"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import useApi from "@/hooks/use-api"; // Assuming useApi is your custom hook for API calls
import { ReusableTable } from "@/components/shared/AppTable";
import ProfeciencyTestModal from "@/components/modals/ProfeciencyTestModal";

const Page = () => {
  const { callApi } = useApi();
  const [data, setData] = useState([]); // State to store fetched proficiency testing data
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility
  const [modalMode, setModalMode] = useState("add"); // Mode for add or edit
  const [currentData, setCurrentData] = useState(null); // Data for editing
const [refresh , setRefresh] = useState(false)
  // Fetch proficiency testing data from the API
  useEffect(() => {
    const fetchProficiencyTestingData = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await callApi("/api/proficiency_testing/", "GET", "", {
          Authorization: `Bearer ${token}`,
        }).then((data) => {
          setData(data);
        });
      } catch (error) {
        console.error("Error fetching proficiency testing data:", error);
      }
    };

    fetchProficiencyTestingData();
  }, [callApi, refresh]);

  // Define columns for the table
  const columns = [
    {
      accessorKey: "schedule_id",
      header: "Schedule ID",
    },
    {
      accessorKey: "test_id.test_name",
      header: "Test Name",
      cell: ({ row }) => row.original.test_id?.test_name || 'N/A',
    },
    {
      accessorKey: "test_start",
      header: "Test Start Date",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "test_status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleEdit(row.original)}
            className="text-blue-500 bg-white"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDelete(row.original)}
            className="text-white bg-red-500"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Handle adding a new proficiency test
  const handleAdd = () => {
    setModalMode("add");
    setCurrentData(null);  // Clear data when adding a new record
    setModalOpen(true);
  };

  // Handle editing an existing proficiency test
  const handleEdit = (data) => {
    setModalMode("edit");
    setCurrentData(data);  // Set current data for editing
    setModalOpen(true);
  };

  // Handle deleting a proficiency test
  const handleDelete = async (data) => {
    const token = localStorage.getItem("accessToken");
    const confirmDelete = window.confirm("Are you sure you want to delete this proficiency test?");
    if (!confirmDelete) return;

    try {
      await callApi(`/api/proficiency_testing/${data.schedule_id}/`, "DELETE", "", {
        Authorization: `Bearer ${token}`,
      });

      // Update the state by removing the deleted record from the list
      // setData((prevData) =>
      //   prevData.filter((item) => item.schedule_id !== data.schedule_id)
      // );

      // alert("Proficiency test deleted successfully!");
    } catch (error) {
      // console.error("Error deleting proficiency test:", error);
      // alert("There was an error deleting the proficiency test.");
    } finally{
      setRefresh(!refresh)
    }
  };

  // Handle submitting the form data after add or edit
  const handleSubmit = (formData) => {
    if (modalMode === "add") {
      // setData((prevData) => [...prevData, formData]);  // Add new test to the list
    } else {
      setData((prevData) =>
        prevData.map((item) =>
          item.schedule_id === formData.schedule_id ? formData : item
        )
      );
    }
    setModalOpen(false);  // Close the modal
    setRefresh(!refresh)
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-10">
      <div className="max-w-7xl w-full rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Proficiency Testing
        </h1>
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleAdd}
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
          >
            <PlusCircle className="mr-2" />
            Add Schedule
          </Button>
        </div>
        {/* Render the table with the fetched proficiency testing data */}
        <ReusableTable data={data} columns={columns} isOption={false} />

        {/* Render the modal for adding or editing proficiency tests */}
        <ProfeciencyTestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          initialData={currentData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Page;
