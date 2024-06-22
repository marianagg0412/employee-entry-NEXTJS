// components/ReportTable.tsx
import React, { useState } from 'react';
import '../styles/dataTables.dataTables.css';
import 'datatables.net';
import { Entry } from '@/types';

interface ReportTableProps {
    data: Entry[];
}

const ReportTable: React.FC<ReportTableProps> = ({ data }) => {
    const [filter, setFilter] = useState('');

    const filteredData = data.filter(item =>
        item.employee_name?.toLowerCase().includes(filter.toLowerCase()) ||
        item.guest_name?.toLowerCase().includes(filter.toLowerCase()) ||
        item.employee_id?.toLowerCase().includes(filter.toLowerCase()) ||
        item.guest_id?.toLowerCase().includes(filter.toLowerCase()) ||
        item.motivo_retiro?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="p-4">
                <input
                    type="text"
                    className="form-input w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="Search by name, ID, or reason..."
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Entry Time</th>
                    <th scope="col" className="px-6 py-3">Exit Time</th>
                    <th scope="col" className="px-6 py-3">Reason for Leaving</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">{item.employee_name || item.guest_name}</td>
                        <td className="px-6 py-4">{item.employee_id || item.guest_id}</td>
                        <td className="px-6 py-4">{new Date(item.entry_time).toLocaleString()}</td>
                        <td className="px-6 py-4">{new Date(item.exit_time).toLocaleString()}</td>
                        <td className="px-6 py-4">{item.motivo_retiro}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;
