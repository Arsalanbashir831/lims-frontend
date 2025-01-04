import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const AppDynamicTable = ({ onSubmit, isPreview, rows: initialRows }) => {
  const [rows, setRows] = useState(initialRows || []);
  const [isEditable, setIsEditable] = useState(!isPreview);

  useEffect(() => {
    if (isPreview && initialRows) {
      setRows(initialRows);
    }
  }, [isPreview, initialRows]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        sr: rows.length + 1,
        activityDescription: '',
        applicableCriteria: '',
        acceptable: '',
        notAcceptable: '',
        rejected: '',
        remarks: ''
      }
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(rows);
    }
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  return (
    <div className="p-4 bg-light-blue-100 text-white">
      <h1 className="text-lg font-bold mb-4 text-blue-900">Checklist Table</h1>
      <table className="w-full border border-blue-500">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border border-blue-600 p-2">SR</th>
            <th className="border border-blue-600 p-2">Activity Description</th>
            <th className="border border-blue-600 p-2">Applicable Criteria</th>
            <th className="border border-blue-600 p-2">Acceptable</th>
            <th className="border border-blue-600 p-2">Not Acceptable</th>
            <th className="border border-blue-600 p-2">Rejected</th>
            <th className="border border-blue-600 p-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="bg-blue-100 text-blue-900">
              <td className="border border-blue-600 p-2 text-center">
                {row.sr}
              </td>
              <td className="border border-blue-600 p-2">
                <input
                  type="text"
                  value={row.activityDescription}
                  onChange={(e) => handleInputChange(index, 'activityDescription', e.target.value)}
                  className="w-full p-1 text-blue-900"
                  disabled={!isEditable}
                />
              </td>
              <td className="border border-blue-600 p-2">
                <input
                  type="text"
                  value={row.applicableCriteria}
                  onChange={(e) => handleInputChange(index, 'applicableCriteria', e.target.value)}
                  className="w-full p-1 text-blue-900"
                  disabled={!isEditable}
                />
              </td>
              <td className="border border-blue-600 p-2">
                <input
                  type="text"
                  value={row.acceptable}
                  onChange={(e) => handleInputChange(index, 'acceptable', e.target.value)}
                  className="w-full p-1 text-blue-900"
                  disabled={!isEditable}
                />
              </td>
              <td className="border border-blue-600 p-2">
                <input
                  type="text"
                  value={row.notAcceptable}
                  onChange={(e) => handleInputChange(index, 'notAcceptable', e.target.value)}
                  className="w-full p-1 text-blue-900"
                  disabled={!isEditable}
                />
              </td>
              <td className="border border-blue-600 p-2">
                <input
                  type="text"
                  value={row.rejected}
                  onChange={(e) => handleInputChange(index, 'rejected', e.target.value)}
                  className="w-full p-1 text-blue-900"
                  disabled={!isEditable}
                />
              </td>
              <td className="border border-blue-600 p-2">
                <input
                  type="text"
                  value={row.remarks}
                  onChange={(e) => handleInputChange(index, 'remarks', e.target.value)}
                  className="w-full p-1 text-blue-900"
                  disabled={!isEditable}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        {!isPreview && isEditable ? (
          <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
            Save
          </Button>
        ) : !isPreview && (
          <Button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
            Edit
          </Button>
        )}
        {!isPreview && isEditable && (
          <Button onClick={addRow} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 ml-2">
            Add Row
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppDynamicTable;
