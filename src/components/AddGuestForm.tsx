import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { GuestTypes } from '@/types'; // Adjust the path based on your project structure

interface AddGuestFormProps {
    onSuccess: () => void;
}

const AddGuestForm: React.FC<AddGuestFormProps> = ({ onSuccess }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data: any) => {
        try {
            await axios.post('http://localhost:5000/guest/register_guest', data);
            reset();
            onSuccess();
            alert("Added guest successfully");
        } catch (error) {
            console.error('Error adding guest:', error);
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="mb-2">
                <label className="block text-gray-700">Guest Name</label>
                <input
                    {...register('guest_name', { required: true })}
                    className="p-2 border rounded w-full"
                    placeholder="Enter guest name"
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Documento Identidad</label>
                <input
                    {...register('documento_identidad', { required: true })}
                    className="p-2 border rounded w-full"
                    placeholder="Enter guest documento identidad"
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Guest Type</label>
                <select {...register('guest_type', { required: true })} className="p-2 border rounded w-full">
                    <option value="">Select guest type</option>
                    {Object.values(GuestTypes).map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Add Guest
            </button>
        </form>
    );
};

export default AddGuestForm;
