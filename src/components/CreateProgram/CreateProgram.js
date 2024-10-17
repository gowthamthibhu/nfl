// src/components/CreateProgram.js
import React from 'react';
import ProgramForm from '../Shared/ProgramForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const CreateProgram = () => {
    const navigate = useNavigate(); 

    const handleCreateProgram = async (programData) => {
        try {
            await axios.post('http://localhost:5000/api/programs', programData);
            alert('Program created successfully!');
            navigate('/programs'); 
        } catch (error) {
            console.error('Error creating program:', error);
            alert('Failed to create the program.');
        }
    };

    return (
        <div className="program-form-container">
            <h3 className="program-form-title">Create Program</h3>
            <ProgramForm 
                initialData={null} 
                onSubmit={handleCreateProgram} 
                submitLabel="Create" 
            />
        </div>
    );
};

export default CreateProgram;
