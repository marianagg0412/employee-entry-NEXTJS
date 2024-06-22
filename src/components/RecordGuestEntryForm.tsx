import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface RecordGuestEntryFormProps {
    onSuccess: () => void;  // Define the type for onSuccess
}

const RecordGuestEntryForm: React.FC<RecordGuestEntryFormProps> = ({ onSuccess }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const endpoint = data.type === 'entry' ? 'guest_entry' : 'guest_exit';
            await axios.post(`http://localhost:5000/guest/${endpoint}`, {
                documento_identidad: data.documento_identidad,
                time: data.time
            });
            reset();
            onSuccess();
            alert("Entry/Exit recorded successfully")
        } catch (error) {
            console.error('Error recording guest entry/exit:', error);
            alert("Error saving entry/exit");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="mb-2">
                <label className="block text-gray-700">Guest Documento Identidad</label>
                <input
                    {...register('documento_identidad', { required: true })}
                    className="p-2 border rounded w-full"
                    placeholder="Enter guest documento identidad"
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Type</label>
                <select {...register('type', { required: true })} className="p-2 border rounded w-full">
                    <option value="entry">Entry</option>
                    <option value="exit">Exit</option>
                </select>
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Time</label>
                <input
                    type="datetime-local"
                    {...register('time', { required: true })}
                    className="p-2 border rounded w-full"
                />
            </div>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Record Entry/Exit
            </button>
        </form>
    );
};

export default RecordGuestEntryForm;
