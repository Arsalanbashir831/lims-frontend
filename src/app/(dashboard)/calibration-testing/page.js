'use client';
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import useApi from "@/hooks/use-api";
import CalibrationTestModal from "@/components/modals/CalibrationTestModal"; // Path to your modal component
import { ReusableTable } from "@/components/shared/AppTable";

const Page = () => {
  const [calibrationData, setCalibrationData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);  // Controls modal visibility
  const [modalMode, setModalMode] = useState("add");  // Mode for add or edit
  const [currentData, setCurrentData] = useState(null);  // Stores the current data for editing
const [refresh , setRefresh ] = useState(false)
  const { callApi } = useApi();


  // Fetch calibration records from the API
  useEffect(() => {
    const fetchCalibrationRecords = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const data = await callApi("/api/calibrations/", "GET", "", {
          Authorization: `Bearer ${token}`,
        });
        setCalibrationData(data); // Store the fetched data in state
      } catch (error) {
        console.log("Error fetching calibration records:", error);
      }
    };

    fetchCalibrationRecords();
  }, [callApi ,refresh]);

  // Handle delete operation
  const handleDelete = async (data) => {
    const token = localStorage.getItem("accessToken");
    const confirmDelete = window.confirm("Are you sure you want to delete this calibration record?");
    if (!confirmDelete) return;

    try {
      // Perform the DELETE request
      await callApi(`/api/calibrations/${data.id}/`, "DELETE", "", {
        Authorization: `Bearer ${token}`,
      });

      // Update the state by removing the deleted record from the list
      setCalibrationData((prevData) =>
        prevData.filter((item) => item.id !== data.id)
      );

      alert("Calibration record deleted successfully!");
    } catch (error) {
      // console.error("Error deleting calibration record:", error);
      // alert("There was an error deleting the record.");
    }finally{ setRefresh(!refresh)}
  };

  // Define columns for the table
  const columns = [
    {
      accessorKey: "id",
      header: "Calibration ID",
    },
    {
      accessorKey: "calibrated_by",
      header: "Calibrated By",
    },
    {
      accessorKey: "calibration_certification_number",
      header: "Certification Number",
    },
    {
      accessorKey: "calibration_date",
      header: "Calibration Date",
    },
    {
      accessorKey: "calibration_due_date",
      header: "Due Date",
    },
    {
      accessorKey: "remarks",
      header: "Remarks",
    },
    {
      accessorKey: "instrument", // This will display the instrument name
      header: "Instrument Name",
      cell: ({ row }) => {
        return row.original.instrument_name;
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
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
            className="text-white bg-red-500"
            onClick={() => handleDelete(row.original)}  // Attach the delete handler here
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Handle adding a new calibration record
  const handleAdd = () => {
    setModalMode("add");
    setCurrentData(null);  // Clear data when adding a new record
    setModalOpen(true);
  };

  // Handle editing an existing calibration record
  const handleEdit = (data) => {
    setModalMode("edit");
    setCurrentData(data);  // Set current data for editing
    setModalOpen(true);
  };

  // Handle submitting the form data after add or edit
  const handleSubmit = (formData) => {
    console.log("Form submitted:", formData);  // You can call an API here to add or update the data
    setModalOpen(false);  // Close the modal
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-10">
      <div className="max-w-7xl w-full rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Calibration Records
        </h1>
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleAdd}
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
          >
            <PlusCircle className="mr-2" /> Add Calibration Record
          </Button>
        </div>
        {/* Render the table with the fetched calibration data */}
        <ReusableTable data={calibrationData} columns={columns} isOption={false} />

        {/* Render the modal for adding or editing calibration records */}
        <CalibrationTestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          initialData={currentData}
          onSubmit={handleSubmit}
          refresh={refresh}
          setRefresh={refresh}
        />
      </div>
    </div>
  );
};

export default Page;
