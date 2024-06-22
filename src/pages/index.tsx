// pages/index.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Home = () => {
    const [currentOccupancy, setCurrentOccupancy] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCurrentOccupancy = async () => {
            try {
                const response = await axios.get('http://localhost:5000/employee/current_occupancy');
                setCurrentOccupancy(response.data.total_occupancy);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching current occupancy:', error);
                setLoading(false);
            }
        };

        fetchCurrentOccupancy();
    }, []);

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mt-10">Welcome to the Entry Control System</h1>
            <p className="text-gray-600 mt-4">Select a report to view:</p>
            <div className="mt-8 space-x-4">
                <Link href="/EmployeeReport" legacyBehavior>
                    <a className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">Employee Report</a>
                </Link>
                <Link href="/GuestReport" legacyBehavior>
                    <a className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">Guest Report</a>
                </Link>
            </div>
            <div className="mt-8">
                {loading ? (
                    <p>Loading current occupancy...</p>
                ) : (
                    <p className="text-xl font-bold text-gray-800">Current Occupancy: {currentOccupancy}</p>
                )}
            </div>
        </div>
    );
};

export default Home;
