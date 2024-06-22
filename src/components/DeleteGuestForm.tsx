import React from 'react';
import axios from 'axios';

interface DeleteGuestFormProps {
    onSuccess: () => void;
    guestId: string;
}

const DeleteGuestForm: React.FC<DeleteGuestFormProps> = ({ onSuccess, guestId }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/guest/delete_guest/${guestId}`);
            onSuccess();
            alert("Guest deleted successfully!");
        } catch (error) {
            console.error('Error deleting guest:', error);
            alert(error);
        }
    };

    return (
        <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded">Delete Guest</button>
    );
};

export default DeleteGuestForm;
