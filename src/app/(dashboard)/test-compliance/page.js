'use client';
import useApi from '@/hooks/use-api';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/shared/Spinner';

const Page = () => {
    const [currJobData, setCurrJobData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const { callApi, loading } = useApi();
    const searchParams = useSearchParams();
    const jobId = searchParams.get("jobId");
    const isEdit = searchParams.get('isEdit') === "true";

    useEffect(() => {
        const fetchJob = async () => {
            const token = localStorage.getItem("accessToken");
            try {
                const data = await callApi(`/api/test_compliance/${jobId}/`, "GET", "", {
                    Authorization: `Bearer ${token}`,
                });
                setCurrJobData(data);
                setTableData(
                    data?.job_data?.tests.map((test, index) => ({
                        testId: test.selected_test.test_id,
                        testName: test.selected_test.test_name,
                        testColumns: test.selected_test.test_columns,
                        rows: (data.job_data?.test_results?.[index]?.rows || []).map(row => ({
                            ...row,
                            images: row.images ? (typeof row.images === 'string' ? row.images : row.images) : null
                        }))
                    }))
                );
            } catch (error) {
                console.error("Failed to fetch job data:", error);
            }
        };
        fetchJob();
    }, []);

    const handleInputChange = (testIndex, rowIndex, field, value) => {
        setTableData((prev) => {
            const updatedTableData = [...prev];
            updatedTableData[testIndex].rows[rowIndex][field] = value;
            return updatedTableData;
        });
    };

    const addRow = (testIndex) => {
        setTableData((prev) => {
            const updatedTableData = [...prev];
            updatedTableData[testIndex].rows.push(
                updatedTableData[testIndex].testColumns.reduce((row, col) => {
                    if (col.toLowerCase() === 'images') {
                        row[col] = null; // Placeholder for file upload
                    } else if (col.toLowerCase() === 'notes') {
                        row[col] = ""; // Placeholder for text input
                    } else {
                        row[col] = "";
                    }
                    return row;
                }, {})
            );
            return updatedTableData;
        });
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("accessToken");

        const formattedTableData = tableData.map(test => ({
            ...test,
            rows: test.rows.map(async row => {
                if (row.images instanceof File) {
                    const blob = await new Promise(resolve => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(row.images);
                    });
                    return { ...row, images: blob };
                }
                return row;
            })
        }));

        console.log("Submitting the following payload:", formattedTableData);

        await callApi(
            `/api/test_compliance/${jobId}/`,
            "PUT",
            {
                ...currJobData,
                job_status: 'pending approval',
                job_data: {
                    ...currJobData.job_data,
                    test_results: await Promise.all(formattedTableData.map(async test => ({
                        ...test,
                        rows: await Promise.all(test.rows)
                    }))),
                },
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )
            .then(() => {
                alert("Payload submitted successfully.");
            })
            .catch(() => {
                alert("Error in submission.");
            });
    };

    return (
      
        <div className="p-6 bg-gray-100 min-h-screen">
            {loading || !currJobData ? (
                <Spinner />
            ) : (
                <div>
                    {tableData.map((test, testIndex) => (
                        <div key={test.testId} className="mb-8 p-4 bg-white shadow rounded">
                            <h2 className="text-lg font-bold mb-2 text-blue-900">
                                Test {testIndex + 1}: {test.testName}
                            </h2>
                            <table className="w-full border border-gray-300 mb-4">
                                <thead className="bg-gray-200">
                                    <tr>
                                        {test.testColumns.map((col) => (
                                            <th key={col} className="border border-gray-400 p-2">
                                                {col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {test.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="border-b border-gray-300">
                                            {test.testColumns.map((col) => (
                                                <td key={col} className="border border-gray-400 p-2">
                                                    {col.toLowerCase() === 'images' ? (
                                                        row[col] ? (
                                                            isEdit ? (
                                                                <>
                                                                    <img
                                                                        src={typeof row[col] === 'string' ? row[col] : URL.createObjectURL(row[col])}
                                                                        alt="Preview"
                                                                        className="w-16 h-16 object-cover mb-2"
                                                                    />
                                                                    <input
                                                                        type="file"
                                                                        onChange={(e) =>
                                                                            handleInputChange(
                                                                                testIndex,
                                                                                rowIndex,
                                                                                col,
                                                                                e.target.files[0]
                                                                            )
                                                                        }
                                                                        className="w-full"
                                                                    />
                                                                </>
                                                            ) : (
                                                                <img
                                                                    src={typeof row[col] === 'string' ? row[col] : URL.createObjectURL(row[col])}
                                                                    alt="Preview"
                                                                    className="w-16 h-16 object-cover mb-2"
                                                                />
                                                            )
                                                        ) : (
                                                            isEdit && (
                                                                <input
                                                                    type="file"
                                                                    onChange={(e) =>
                                                                        handleInputChange(
                                                                            testIndex,
                                                                            rowIndex,
                                                                            col,
                                                                            e.target.files[0]
                                                                        )
                                                                    }
                                                                    className="w-full"
                                                                />
                                                            )
                                                        )
                                                    ) : col.toLowerCase() === 'notes' ? (
                                                        <textarea
                                                            value={row[col] || ""}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    testIndex,
                                                                    rowIndex,
                                                                    col,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full p-1 border border-gray-300 rounded"
                                                            disabled={!isEdit}
                                                        ></textarea>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            value={row[col] || ""}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    testIndex,
                                                                    rowIndex,
                                                                    col,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full p-1 border border-gray-300 rounded"
                                                            disabled={!isEdit}
                                                        />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {isEdit && (
                                <Button
                                    onClick={() => addRow(testIndex)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Add Row
                                </Button>
                            )}
                        </div>
                    ))}
                    {isEdit && (
                        <Button
                            onClick={handleSubmit}
                            className="bg-green-500 text-white px-6 py-2 rounded mt-4"
                        >
                            Submit
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Page;
