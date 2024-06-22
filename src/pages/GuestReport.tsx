import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GuestTable from '../components/GuestTable';
import AddGuestForm from '../components/AddGuestForm';
import RecordGuestEntryForm from '../components/RecordGuestEntryForm';
import ModifyGuestForm from '../components/ModifyGuestForm';
import DeleteGuestForm from '../components/DeleteGuestForm';
import { GuestEntry } from '@/types';

const GuestReport = () => {
    const [data, setData] = useState<GuestEntry[]>([]);
    const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
    const [showModifyDeleteOptions, setShowModifyDeleteOptions] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/guest/guests_all');
            setData(response.data.map((entry: any[]) => ({
                guest_name: entry[0],
                guest_id: entry[1],
                entry_time: new Date(entry[2]).toLocaleString(),
                exit_time: new Date(entry[3]).getTime() === new Date('1970-01-01T00:00:00Z').getTime() ? "Not exited yet" : new Date(entry[3]).toLocaleString(),
                guest_type: entry[4],
            })));
        } catch (error) {
            console.error('Error fetching guest data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = async () => {
        fetchData();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Guest Report</h1>
                <button onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                        className="mb-4 p-2 bg-blue-500 text-white rounded">
                    {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
                </button>
                {showAdvancedOptions && (
                    <div>
                        <AddGuestForm onSuccess={refreshData} />
                        <RecordGuestEntryForm onSuccess={refreshData} />
                    </div>
                )}
                <button onClick={() => setShowModifyDeleteOptions(!showModifyDeleteOptions)}
                        className="mb-4 p-2 bg-red-500 text-white rounded">
                    {showModifyDeleteOptions ? 'Hide Modify/Delete Options' : 'Show Modify/Delete Options'}
                </button>
                {showModifyDeleteOptions && (
                    <div>
                        <select onChange={(e) => setSelectedGuestId(e.target.value)} className="p-2 border rounded w-full mb-4">
                            <option value="">Select a guest to modify/delete</option>
                            {data.map(guest => (
                                <option key={guest.guest_id} value={guest.guest_id}>{guest.guest_name}</option>
                            ))}
                        </select>
                        {selectedGuestId && (
                            <>
                                <ModifyGuestForm onSuccess={refreshData} guestId={selectedGuestId} />
                                <DeleteGuestForm onSuccess={refreshData} guestId={selectedGuestId} />
                            </>
                        )}
                    </div>
                )}
                <GuestTable data={data} />
            </div>
        </div>
    );
};

export default GuestReport;
