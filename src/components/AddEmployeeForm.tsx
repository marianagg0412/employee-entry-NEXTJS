// components/AddEmployeeForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Areas } from '@/types' // Adjust the path based on your project structure

interface AddEmployeeFormProps {
    onSuccess: () => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onSuccess }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data: any) => {
        try {
            await axios.post('http://localhost:5000/employee/register_employee', data);
            reset();
            onSuccess();
        } catch (error) {
            console.error('Error adding employee:', error);
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="mb-2">
                <label className="block text-gray-700">Name</label>
                <input
                    {...register('nombre', { required: true })}
                    className="p-2 border rounded w-full"
                    placeholder="Enter employee name"
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">ID</label>
                <input
                    {...register('documento_identidad', { required: true })}
                    className="p-2 border rounded w-full"
                    placeholder="Enter employee ID"
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Area</label>
                <select {...register('area', { required: true })}>
                    <option value="">Select an area</option>
                    {Object.values(Areas).map((area) => (
                        <option key={area} value={area}>{area}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Add Employee
            </button>
        </form>
    );
};

export default AddEmployeeForm;
