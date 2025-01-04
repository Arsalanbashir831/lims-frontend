'use client';

import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import useApi from '@/hooks/use-api';

const CertificateComponent = ({ reportData }) => {
    const certificateRef = useRef(null);
    const { callApi } = useApi();
    const [submitting, setSubmitting] = useState(false);
    const [printingDate, setPrintingDate] = useState(null);
    const [imageURLs, setImageURLs] = useState({}); // Store Object URLs for blob images

    // Convert blob images to Object URLs on load
    useEffect(() => {
        if (!reportData?.job_data?.test_results) return;

        const imageMap = {};

        reportData.job_data.test_results.forEach((test, testIndex) => {
            test.rows.forEach((row, rowIndex) => {
                if (row.images && row.images instanceof File) {
                    imageMap[`${testIndex}-${rowIndex}`] = URL.createObjectURL(row.images);
                } else if (typeof row.images === 'string') {
                    imageMap[`${testIndex}-${rowIndex}`] = row.images;
                }
            });
        });

        setImageURLs(imageMap);

        return () => {
            // Clean up Object URLs to prevent memory leaks
            Object.values(imageMap).forEach(URL.revokeObjectURL);
        };
    }, [reportData]);

    const handlePrint = () => {
        setPrintingDate(new Date().toLocaleString());

        setTimeout(() => {
            window.print();
        }, 300);
    };

    const handleSubmitForApproval = async () => {
        if (!reportData?.job_id) {
            alert("Job ID not found.");
            return;
        }

        setSubmitting(true);

        try {
            const token = localStorage.getItem("accessToken");
            await callApi(
                `/api/test_compliance/${reportData.job_id}/`,
                "PUT",
                { job_status: "pending approval" },
                { Authorization: `Bearer ${token}` }
            );

            alert("Submitted for approval successfully.");
        } catch (error) {
            alert("Failed to submit for approval.");
            console.error("Submission error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!reportData || !reportData.job_data || !reportData.client_data) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-lg text-red-600 font-semibold">No data available for the report.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div
                ref={certificateRef}
                className="max-w-full bg-white rounded-lg p-12 print:p-0"
                style={{
                    width: '400mm', // A4 width
                    minHeight: '297mm', // A4 height
                    fontFamily: 'Arial, sans-serif',
                }}
            >
                {/* Company Logo and QR Code */}
                <div className="flex justify-between items-center mb-8">
                    <img src="/gripco_logo.svg" alt="Company Logo" className="h-16" />
                    <QRCode value={reportData?.compiled_report || ''} size={100} />
                </div>

                <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">TEST REPORT</h1>

                {/* Printing Date - Always Visible */}
                <p className="text-center text-gray-600 mb-6 print:block hidden">
                    <strong>Printing Date:</strong> {printingDate || new Date().toLocaleString()}
                </p>

                {/* Client Details */}
                <div className="mb-6">
                    <p className="text-lg"><strong>Client Name:</strong> {reportData?.client_data?.client_name || 'N/A'}</p>
                    <p className="text-lg"><strong>Client Address:</strong> {reportData?.client_data?.client_address || 'N/A'}</p>
                    <p className="text-lg"><strong>Client Contact:</strong> {reportData?.client_data?.client_contact || 'N/A'}</p>
                </div>

                {/* Tests Details */}
                {(reportData?.job_data?.tests || []).map((test, testIndex) => {
                    const testResults = reportData?.job_data?.test_results?.[testIndex]?.rows || [];

                    return (
                        <div key={testIndex} className="mb-10">
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                                    Test {testIndex + 1}: {test?.selected_test?.test_name || 'Unknown Test'}
                                </h2>
                                <p className="text-gray-700 mb-4">{test?.selected_test?.test_description || 'No description available'}</p>

                                <table className="w-full border border-gray-400 mb-6">
                                    <thead className="bg-gray-300">
                                        <tr>
                                            {(test?.selected_test?.test_columns || [])
                                                .filter(col => col.toLowerCase() !== 'images')
                                                .map((col) => (
                                                    <th key={col} className="border border-gray-500 p-3 text-left text-lg text-gray-800">
                                                        {col}
                                                    </th>
                                                ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {testResults.length > 0 ? (
                                            testResults.map((row, rowIndex) => (
                                                <tr key={rowIndex} className="border-b border-gray-400">
                                                    {(test?.selected_test?.test_columns || [])
                                                        .filter(col => col.toLowerCase() !== 'images')
                                                        .map((col) => (
                                                            <td key={col} className="border border-gray-400 p-3 text-lg text-gray-700">
                                                                {row[col] || '-'}
                                                            </td>
                                                        ))}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={test?.selected_test?.test_columns?.length || 1} className="text-center p-4 text-lg">
                                                    No test results available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {/* Blob Images Fix - Ensure they appear before printing */}
                                {testResults.some(row => row.images) && (
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        {testResults.map((row, rowIndex) =>
                                            imageURLs[`${testIndex}-${rowIndex}`] ? (
                                                <div key={rowIndex} className="w-40 h-40 border border-gray-400 rounded-md">
                                                    <img
                                                        src={imageURLs[`${testIndex}-${rowIndex}`]}
                                                        alt={`Test ${testIndex + 1} Image ${rowIndex + 1}`}
                                                        className="w-full h-full object-cover rounded-md"
                                                    />
                                                </div>
                                            ) : null
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Action Buttons - HIDDEN DURING PRINTING */}
                <div className="text-center mt-6 flex justify-center gap-4 print:hidden">
                    <Button
                        onClick={handlePrint}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Print Report
                    </Button>
                    <Button
                        onClick={handleSubmitForApproval}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition"
                        disabled={submitting}
                    >
                        {submitting ? "Submitting..." : "Submit for Approval"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CertificateComponent;
