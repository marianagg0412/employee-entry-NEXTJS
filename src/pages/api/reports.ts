// pages/api/reports.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Fetch employee entries from the Flask backend
        const employeeResponse = await axios.get('http://localhost:5000/employee/employee_all');
        const employeeEntries = employeeResponse.data;

        // Fetch guest entries from the Flask backend
        const guestResponse = await axios.get('http://localhost:5000/guest/guests'); //change
        const guestEntries = guestResponse.data;

        console.log('Employee Entries:', employeeEntries);
        console.log('Guest Entries:', guestEntries);

        // Return the combined data
        res.status(200).json({ employeeEntries, guestEntries });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
