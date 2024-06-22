import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeTable from '../components/EmployeeTable';
import AddEmployeeForm from '../components/AddEmployeeForm';
import RecordEntryForm from '../components/RecordEntryForm';
import { Entry, AbsenceType, Areas } from '@/types';

const EmployeeReport = () => {
    const [data, setData] = useState<Entry[]>([]);
    const [filteredData, setFilteredData] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterDate, setFilterDate] = useState<string>('');
    const [filterEmployee, setFilterEmployee] = useState<string>('');
    const [filterArea, setfilterArea] = useState<Areas | ''>('');
    const [filterAbsence, setFilterAbsence] = useState<AbsenceType | ''>('');
    const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employee/employee_all');
            console.log('Raw API Response:', response.data);

            // Group entries by employee and date
            const groupedData = response.data.reduce((acc: any, entry: any[]) => {
                const employee_id = entry[1]; // Assuming this is the employee ID
                const date = new Date(entry[2]).toISOString().split('T')[0];
                if (!acc[employee_id]) {
                    acc[employee_id] = {};
                }
                if (!acc[employee_id][date]) {
                    acc[employee_id][date] = [];
                }
                acc[employee_id][date].push(entry);
                return acc;
            }, {});

            // Transform grouped data
            const transformedData: Entry[] = [];
            for (const employee_id in groupedData) {
                for (const date in groupedData[employee_id]) {
                    const entries = groupedData[employee_id][date];
                    const lastExitTime = entries.reduce((latest: any, entry: any) => {
                        const exitTime = new Date(entry[3]);
                        return exitTime > latest? exitTime : latest;
                    }, new Date(0));
                    const totalTime = entries.reduce((total: number, entry: any) => {
                        const entryTime = new Date(entry[2]).getTime();
                        const exitTime = new Date(entry[3]).getTime();
                        return total + (exitTime - entryTime);
                    }, 0);
                    const motivoRetiro = entries.some((entry: any) => new Date(entry[3]).getUTCHours() < 16)? (entries[0][4] as AbsenceType) : null;

                    // Check if lastExitTime is January 1, 1970, 00:00:00
                    const exitTimeString = lastExitTime.getTime() === 0? "Not exited yet" : new Date(lastExitTime).toISOString();

                    transformedData.push({
                        employee_name: entries[0][0],
                        employee_id: employee_id,
                        employee_area: entries[0][5] as Areas,
                        entry_time: new Date(entries[0][2]).toISOString(),
                        exit_time: exitTimeString,
                        total_time: totalTime > 0? new Date(totalTime).toISOString().substr(11, 8) : null,
                        motivo_retiro: motivoRetiro,
                    });
                }
            }


            console.log('Transformed Data:', transformedData);
            setData(transformedData);
            setFilteredData(transformedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching employee data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log('Data state updated:', data);
    }, [data]);

    useEffect(() => {
        applyFilters();
    }, [filterDate, filterEmployee, filterAbsence, filterArea]);

    const applyFilters = () => {
        let filtered = data;

        if (filterDate) {
            filtered = filtered.filter(entry => entry.entry_time.startsWith(filterDate));
        }

        if (filterArea) {
            filtered = filtered.filter(entry => entry.employee_area === filterArea);
        }

        if (filterEmployee) {
            filtered = filtered.filter(entry => entry.employee_name.toLowerCase().includes(filterEmployee.toLowerCase()));
        }

        if (filterAbsence) {
            filtered = filtered.filter(entry => entry.motivo_retiro === filterAbsence);
        }

        setFilteredData(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Report</h1>
                <div className="mb-4">
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="mr-4 p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Filter by employee"
                        value={filterEmployee}
                        onChange={(e) => setFilterEmployee(e.target.value)}
                        className="mr-4 p-2 border rounded"
                    />
                    <select
                        value={filterArea}
                        onChange={(e) => setfilterArea(e.target.value as Areas)}
                        className="mr-4 p-2 border rounded"
                    >
                        <option value="">Filter by area of employee</option>
                        <option value={Areas.IT}>Sistemas</option>
                        <option value={Areas.MARK}>Mercadeo</option>
                        <option value={Areas.PROD}>Producción</option>
                    </select>
                    <select
                        value={filterAbsence}
                        onChange={(e) => setFilterAbsence(e.target.value as AbsenceType)}
                        className="mr-4 p-2 border rounded"
                    >
                        <option value="">Filter by type of absence</option>
                        <option value={AbsenceType.CITA_MEDICA}>Cita médica</option>
                        <option value={AbsenceType.CALAMIDAD}>Calamidad</option>
                        <option value={AbsenceType.DILIGENCIA_PERSONAL}>Diligencia personal</option>
                    </select>
                </div>
                <button
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                    className="mb-4 p-2 bg-blue-500 text-white rounded"
                >
                    {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
                </button>
                {showAdvancedOptions && (
                    <div className="mb-4">
                        <AddEmployeeForm onSuccess={fetchData} />
                        <RecordEntryForm onSuccess={fetchData} />
                    </div>
                )}
                {filteredData.length > 0 ? (
                    <EmployeeTable data={filteredData} />
                ) : (
                    <div>No data available</div>
                )}
            </div>
        </div>
    );
};

export default EmployeeReport;
