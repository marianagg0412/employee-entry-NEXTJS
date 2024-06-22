// pages/reports.tsx
import { useEffect, useState } from 'react';
import ReportTable from '../components/ReportTable';
import { Entry } from '../types';

const Reports = () => {
    const [data, setData] = useState<Entry[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/reports');
            const result = await response.json();
            console.log('Fetched Data:', result);  // Debugging log
            setData([...result.employeeEntries, ...result.guestEntries]);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Reports</h1>
            <ReportTable data={data} />
        </div>
    );
};

export default Reports;
