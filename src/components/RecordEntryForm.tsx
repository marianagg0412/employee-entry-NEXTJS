import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { AbsenceType } from '@/types';

interface RecordEntryFormProps {
    onSuccess: () => void;
}

const RecordEntryForm: React.FC<RecordEntryFormProps> = ({ onSuccess }) => {
    const { register, handleSubmit, reset, watch, control } = useForm();
    const watchType = watch('type', 'entry');

    const onSubmit = async (data: any) => {
        try {
            if (data.type === 'entry') {
                await axios.post('http://localhost:5000/employee/employee_entry', {
                    documento_identidad: data.documento_identidad,
                    entry_time: data.time,
                });
            } else {
                await axios.post('http://localhost:5000/employee/employee_exit', {
                    documento_identidad: data.documento_identidad,
                    exit_time: data.time,
                    motivo_retiro: data.motivo_retiro || null,
                });
            }
            reset();
            onSuccess();
            alert("Entry added successfully");
        } catch (error) {
            console.error('Error recording entry:', error);
            alert("Error saving entry");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="mb-2">
                <label className="block text-gray-700">Employee ID</label>
                <input
                    {...register('documento_identidad', { required: true })}
                    className="p-2 border rounded w-full"
                    placeholder="Enter employee ID"
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
            {watchType === 'exit' && (
                <div className="mb-2">
                    <label className="block text-gray-700">Reason for Leaving (if it is not yet 16h00)</label>
                    <Controller
                        name="motivo_retiro"
                        control={control}
                        render={({ field }) => (
                            <select {...field} className="p-2 border rounded w-full">
                                <option value="">Select reason</option>
                                <option value={AbsenceType.CITA_MEDICA}>Cita médica</option>
                                <option value={AbsenceType.CALAMIDAD}>Calamidad</option>
                                <option value={AbsenceType.DILIGENCIA_PERSONAL}>Diligencia personal</option>
                            </select>
                        )}
                    />
                </div>
            )}
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Record Entry
            </button>
        </form>
    );
};

export default RecordEntryForm;
