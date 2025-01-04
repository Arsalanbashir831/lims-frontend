'use client';

import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';

const CertificateComponent = ({ reportData }) => {
    const certificateRef = useRef(null);

    const generatePDF = async () => {
        if (!certificateRef.current) return;
        const canvas = await html2canvas(certificateRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 310);
        pdf.save('ComplianceCertificate.pdf');
    };

    // Ensure reportData is defined before proceeding
    if (!reportData || !reportData.job_data || !reportData.client_data) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-lg text-red-600 font-semibold">No data available for the report.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div ref={certificateRef} className="max-w-full mx-auto bg-white shadow-lg rounded-lg p-8">
                {/* Company Logo and QR Code */}
                <div className="flex justify-between items-center mb-8">
                    <img src="/gripco_logo.svg" alt="Company Logo" height={500} width={500} />
                    <QRCode value={`${process.env.NEXT_PUBLIC_URL}/report/?${reportData?.job_id} || ''`} size={100} />
                </div>

                <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">TEST REPORTS</h1>

                {/* Client Details */}
                <div className="mb-6">
                    <p className="text-lg"><strong>Client Name:</strong> {reportData?.client_data?.client_name || 'N/A'}</p>
                    <p className="text-lg"><strong>Client Address:</strong> {reportData?.client_data?.client_address || 'N/A'}</p>
                    <p className="text-lg"><strong>Client Contact:</strong> {reportData?.client_data?.client_contact || 'N/A'}</p>
                </div>

                {/* Tests Details */}
                {(reportData?.job_data?.tests || []).map((test, index) => {
                    const testResults = reportData?.job_data?.test_results?.[index]?.rows || [];

                    return (
                        <div key={index} className="mb-10">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                                    Test {index + 1}: {test?.selected_test?.test_name || 'Unknown Test'}
                                </h2>
                                <p className="text-gray-700 mb-4">{test?.selected_test?.test_description || 'No description available'}</p>

                                <table className="w-full border border-gray-300 mb-6">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            {(test?.selected_test?.test_columns || [])
                                                .filter(col => col.toLowerCase() !== 'images')
                                                .map((col) => (
                                                    <th key={col} className="border border-gray-400 p-2 text-left text-sm text-gray-800">
                                                        {col}
                                                    </th>
                                                ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {testResults.length > 0 ? (
                                            testResults.map((row, rowIndex) => (
                                                <tr key={rowIndex} className="border-b border-gray-300">
                                                    {(test?.selected_test?.test_columns || [])
                                                        .filter(col => col.toLowerCase() !== 'images')
                                                        .map((col) => (
                                                            <td key={col} className="border border-gray-400 p-2 text-sm text-gray-700">
                                                                {row[col] || '-'}
                                                            </td>
                                                        ))}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={test?.selected_test?.test_columns?.length || 1} className="text-center p-3">
                                                    No test results available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {/* Images */}
                                {testResults.some(row => row.images) && (
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        {testResults.map((row, imgIndex) =>
                                            row.images ? (
                                                <div key={imgIndex} className="w-32 h-32 border border-gray-300 rounded-md">
                                                    <img
                                                        src={row.images}
                                                        alt={`Test ${index + 1} Image ${imgIndex + 1}`}
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

                {/* Signatures */}
                <div className="mt-8 flex justify-between items-start w-full">
                    <div className="text-center flex-1">
                        <p className="font-semibold">Client Signature</p>
                        <div className="mt-2 w-32 h-16 border-t-2 border-gray-500 mx-auto"></div>
                    </div>
                    <div className="flex flex-col items-center gap-6 flex-1">
                        <div className="text-center">
                            <p className="font-semibold">Manager Signature</p>
                            <div className="mt-2 w-32 h-16 border-t-2 border-gray-500"></div>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold">Supervisor Signature</p>
                            <div className="mt-2 w-32 h-16 border-t-2 border-gray-500"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Button */}
            <div className="text-center mt-6">
                <button
                    onClick={generatePDF}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default CertificateComponent;
