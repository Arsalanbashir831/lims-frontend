'use client';
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogOverlay } from "@/components/ui/alert-dialog"; // ShadCN AlertDialog
import useApi from "@/hooks/use-api"; // Custom hook for API calls

const ReusableAlertDialog = ({ isOpen, onClose, mode, initialData, onSubmit ,refresh , setRefresh }) => {
  const { callApi } = useApi();
  const [labEquipments, setLabEquipments] = useState([]); // Lab equipment data
  const [filteredLabEquipments, setFilteredLabEquipments] = useState([]); // Filtered results based on search
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [formData, setFormData] = useState({
    instrument: {}, // Store full object for instrument
    calibrated_by: '',
    calibration_certification_number: '',
    calibration_date: '',
    calibration_due_date: '',
    remarks: '',
  });

  // Fetch lab equipment data from the API
  useEffect(() => {
    const fetchLabEquipmentData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const data = await callApi("/api/lab-equipment/", "GET", "", {
          Authorization: `Bearer ${token}`,
        });
        setLabEquipments(data);
        setFilteredLabEquipments(data); // Set filtered list initially as all lab equipment
      } catch (error) {
        console.error("Error fetching lab equipment:", error);
      }
    };
    fetchLabEquipmentData();
  }, [callApi]);

  // Populate form data for edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      const selectedInstrument = labEquipments.find(
        (equipment) => equipment.list_id === initialData.instrument_id
      );
      setFormData({
        instrument: selectedInstrument || {}, // Store the full object of instrument
        calibrated_by: initialData.calibrated_by,
        calibration_certification_number: initialData.calibration_certification_number,
        calibration_date: initialData.calibration_date,
        calibration_due_date: initialData.calibration_due_date,
        remarks: initialData.remarks,
      });
      setSearchTerm(selectedInstrument ? selectedInstrument.equipment_name : ""); // Set search term for the selected instrument
    }
  }, [mode, initialData, labEquipments]);

  // Handle form data changes (for text fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle instrument selection change
  const handleSelectChange = (selectedInstrument) => {
    setFormData((prev) => ({ ...prev, instrument: selectedInstrument }));
    setSearchTerm(selectedInstrument.equipment_name); // Set the search term to the selected instrument name
  };

  // Handle search input change and filter the lab equipment list
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    const filteredResults = labEquipments.filter((equipment) =>
      `${equipment.instrument_id} ${equipment.equipment_name}`.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLabEquipments(filteredResults);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      const formDataToSubmit = {
        ...formData,
        instrument: formData.instrument.list_id, // Pass only the list_id for instrument_id to the backend
      };

      if (mode === "add") {
        await callApi("/api/calibrations/", "POST", formDataToSubmit, {
          Authorization: `Bearer ${token}`,
        });
      } else {
        await callApi(`/api/calibrations/${initialData.id}/`, "PUT", formDataToSubmit, {
          Authorization: `Bearer ${token}`,
        });
      }
      onSubmit(formDataToSubmit);
    
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }finally{
        setRefresh(!refresh)
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent className="bg-white"> {/* Set background color to white */}
        <AlertDialogHeader>
          <AlertDialogTitle>{mode === "edit" ? "Edit Calibration" : "Add Calibration"}</AlertDialogTitle>
          <AlertDialogDescription>
            {mode === "edit" ? "Edit the calibration details below." : "Fill in the details to add a new calibration."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Instrument Searchable Dropdown */}
            <div>
              <Label htmlFor="instrument">Instrument</Label>
              <Input
                id="instrument"
                name="instrument"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for an instrument"
                required
              />
              <div className="mt-2">
                {/* Display filtered lab equipment list */}
                {filteredLabEquipments?.length > 0 && (
                  <div className="bg-white border mt-2 rounded shadow-md max-h-60 overflow-y-auto">
                    {filteredLabEquipments?.map((equipment) => (
                      <div
                        key={equipment.list_id}
                        className="cursor-pointer p-2 hover:bg-gray-200"
                        onClick={() => handleSelectChange(equipment)} // Set the full instrument object on selection
                      >
                        {equipment.instrument_id} - {equipment.equipment_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Other form fields */}
            <div>
              <Label htmlFor="calibrated_by">Calibrated By</Label>
              <Input
                id="calibrated_by"
                name="calibrated_by"
                value={formData.calibrated_by}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="calibration_certification_number">Certification Number</Label>
              <Input
                id="calibration_certification_number"
                name="calibration_certification_number"
                value={formData.calibration_certification_number}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="calibration_date">Calibration Date</Label>
              <Input
                id="calibration_date"
                name="calibration_date"
                type="date"
                value={formData.calibration_date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="calibration_due_date">Due Date</Label>
              <Input
                id="calibration_due_date"
                name="calibration_due_date"
                type="date"
                value={formData.calibration_due_date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">{mode === "edit" ? "Save Changes" : "Add Calibration"}</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReusableAlertDialog;
