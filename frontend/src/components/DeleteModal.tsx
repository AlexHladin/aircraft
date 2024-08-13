import React from 'react';

interface DeleteModalProps {
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal = ({ onClose, onDelete }: DeleteModalProps) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
            <div className="relative mx-auto max-w-sm">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Delete Row</h2>
                        
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this row?</p>
                        
                        <div className="flex justify-center">
                            <button 
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mr-4"
                                onClick={onDelete}    
                            >Delete</button>
                            <button 
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                                onClick={onClose}    
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DeleteModal;