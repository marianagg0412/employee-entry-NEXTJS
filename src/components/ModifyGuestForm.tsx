import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {GuestTypes} from "@/types";

interface ModifyGuestFormProps {
    onSuccess: () => void;
    documento_identidad: string;
}

interface FormData {
    new_guest_name?: string;
    new_guest_type?: string;
}

const ModifyGuestForm: React.FC<ModifyGuestFormProps> = ({ onSuccess, documento_identidad }) => {
    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        // Filter out empty strings before sending data
        const filteredData = Object.entries(data).reduce((acc: FormData, [key, value]) => {
            if (value !== "") {
                acc[key as keyof FormData] = value;
            }
            return acc;
        }, {});

        try {
            await axios.put(`http://localhost:5000/guest/modify_guest/${documento_identidad}`, filteredData);
            reset();
            onSuccess();
            alert("Guest modified successfully!");
        } catch (error) {
            console.error('Error modifying guest:', error);
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="mb-2">
                <label className="block text-gray-700">New Guest Name</label>
                <input {...register('new_guest_name')} placeholder="New Guest Name"
                       className="p-2 border rounded w-full"/>
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">New Guest Type</label>
                <select {...register('new_guest_type')} className="p-2 border rounded w-full">
                    <option value="">Select Guest Type</option>
                    {Object.entries(GuestTypes).map(([key, value]) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Modify Guest</button>
        </form>
    );
};

export default ModifyGuestForm;
