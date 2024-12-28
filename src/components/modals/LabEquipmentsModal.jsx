'use client';

import React, { useState, useEffect } from 'react';
import { 
    AlertDialog, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogOverlay 
} from "@/components/ui/alert-dialog"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 

const LabEquipmentDialog = ({ isOpen, onClose, mode, initialData, onSubmit }) => {
    const [formData, setFormData] = useState({
        instrument_id: '',
        equipment_name: '',
        manufacturer_name: '',
        model_name: '',
        serial_number: '',
        date_of_manufacture: '',
        list_id:''
    });

    // Update formData when initialData changes or when mode changes
    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setFormData({
                instrument_id: initialData.instrument_id || '',
                list_id: initialData.list_id || '',
                equipment_name: initialData.equipment_name || '',
                manufacturer_name: initialData.manufacturer_name || '',
                model_name: initialData.model_name || '',
                serial_number: initialData.serial_number || '',
                date_of_manufacture: initialData.date_of_manufacture || '',
            });
        } else if (mode === 'add') {
            // Reset formData to empty values when switching to 'add' mode
            setFormData({
                instrument_id: '',
                equipment_name: '',
                manufacturer_name: '',
                model_name: '',
                serial_number: '',
                date_of_manufacture: '',
            });
        }
    }, [initialData, mode]); // Re-run effect when initialData or mode changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogOverlay className="bg-black/40" /> {/* Light black transparent overlay */}
            <AlertDialogContent className="bg-white rounded-lg p-4"> {/* White background and reduced spacing */}
                <AlertDialogHeader className="mb-4">
                    <AlertDialogTitle className="text-lg font-semibold">{mode === 'edit' ? 'Edit Instrument' : 'Add Instrument'}</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-gray-500">
                        Fill in the details for the instrument below:
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-2"> {/* Reduced spacing between form fields */}
                        <div>
                            <Label htmlFor="instrument_id" className="text-sm">Instrument ID</Label>
                            <Input
                                id="instrument_id"
                                name="instrument_id"
                                value={formData.instrument_id}
                                onChange={handleChange}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="equipment_name" className="text-sm">Equipment Name</Label>
                            <Input
                                id="equipment_name"
                                name="equipment_name"
                                value={formData.equipment_name}
                                onChange={handleChange}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="manufacturer_name" className="text-sm">Manufacturer Name</Label>
                            <Input
                                id="manufacturer_name"
                                name="manufacturer_name"
                                value={formData.manufacturer_name}
                                onChange={handleChange}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="model_name" className="text-sm">Model Name</Label>
                            <Input
                                id="model_name"
                                name="model_name"
                                value={formData.model_name}
                                onChange={handleChange}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="serial_number" className="text-sm">Serial Number</Label>
                            <Input
                                id="serial_number"
                                name="serial_number"
                                value={formData.serial_number}
                                onChange={handleChange}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="date_of_manufacture" className="text-sm">Date of Manufacture</Label>
                            <Input
                                id="date_of_manufacture"
                                name="date_of_manufacture"
                                type="date"
                                value={formData.date_of_manufacture}
                                onChange={handleChange}
                                required
                                className="mt-1"
                            />
                        </div>
                    </div>
                    <AlertDialogFooter className="mt-4 flex justify-end space-x-2"> {/* Reduced spacing */}
                        <Button variant="secondary" onClick={onClose} className="px-4 py-2">
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" className="px-4 py-2">
                            {mode === 'edit' ? 'Save Changes' : 'Add'}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LabEquipmentDialog;
