// components/GuestTable.tsx
import React from 'react';
import { GuestEntry } from '@/types';

interface GuestTableProps {
    data: GuestEntry[];
}

const GuestTable: React.FC<GuestTableProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Entry Time</th>
                    <th scope="col" className="px-6 py-3">Exit Time</th>
                    <th scope="col" className="px-6 py-3">Guest Type</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">{item.guest_name}</td>
                        <td className="px-6 py-4">{item.guest_id}</td>
                        <td className="px-6 py-4">{new Date(item.entry_time).toLocaleString('en-GB', {timeZone: 'UTC'})}</td>
                        <td className="px-6 py-4">{new Date(item.exit_time).toLocaleString('en-GB', {timeZone: 'UTC'})}</td>
                        <td className="px-6 py-4">{item.guest_type}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GuestTable;
