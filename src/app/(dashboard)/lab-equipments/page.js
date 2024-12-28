'use client';
import React, { useEffect, useState } from "react";
import LabEquipmentModal from "@/components/modals/LabEquipmentsModal"; // Ensure this is the correct path
import { ReusableTable } from "@/components/shared/AppTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import useApi from "@/hooks/use-api";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentData, setCurrentData] = useState(null);
  const { callApi, loading } = useApi();
  const [data, setData] = useState([]);
  const [refresh , setRefresh] = useState(false)

  useEffect(() => {
    const fetchEquipments = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const equipments = await callApi("/api/lab-equipment/", "GET", "", {
          Authorization: `Bearer ${token}`,
        });
        setData(equipments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEquipments();
  }, [callApi , refresh]);

  const columns = [
    {
      accessorKey: "list_id",
      header: "List ID",
    },
    {
      accessorKey: "instrument_id",
      header: "Instrument ID",
    },
    {
      accessorKey: "equipment_name",
      header: "Equipment Name",
    },
    {
      accessorKey: "manufacturer_name",
      header: "Manufacturer Name",
    },
    {
      accessorKey: "model_name",
      header: "Model Name",
    },
    {
      accessorKey: "serial_number",
      header: "Serial Number",
    },
    {
      accessorKey: "date_of_manufacture",
      header: "Date of Manufacture",
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
            onClick={() => handleDelete(row.original.list_id)} // Using list_id here
            className="text-white bg-red-500"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setModalMode("add");
    setCurrentData(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setModalMode("edit");
    setCurrentData(item);
    setModalOpen(true);
  };

  const handleDelete = async (listId) => {  // Use list_id here for deletion
    const token = localStorage.getItem("accessToken");
    try {
      await callApi(`/api/lab-equipment/${listId}/`, "DELETE", "", {
        Authorization: `Bearer ${token}`,
      })
 
    } catch (error) {
      console.error("Failed to delete equipment:", error);
    }finally{
      setRefresh(!refresh)
    }
  };

  const handleSubmit = async (formData) => {
    console.log(formData);
    
    try {
      const token = localStorage.getItem("accessToken");

      if (modalMode === "add") {
        const newEquipment = await callApi("/api/lab-equipment/", "POST", formData, {
          Authorization: `Bearer ${token}`,
        });
        setData((prev) => [...prev, newEquipment]);
      } else {
        const updatedEquipment = await callApi(
          `/api/lab-equipment/${formData.list_id}/`,  // Use list_id here for update
          "PUT",
          formData,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        setData((prev) =>
          prev.map((item) =>
            item?.list_id === updatedEquipment?.list_id
              ? { ...item, ...updatedEquipment }
              : item
          )
        );
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-10">
      <div className="max-w-7xl w-full rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Equipment Inventory
        </h1>
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleAdd}
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
          >
            <PlusCircle className="mr-2" /> Add Equipment
          </Button>
        </div>
        <ReusableTable data={data} columns={columns} isOption={false} />
        <LabEquipmentModal
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
