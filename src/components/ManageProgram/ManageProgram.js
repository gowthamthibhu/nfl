// src/components/ManageProgram.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import ProgramForm from '../Shared/ProgramForm';
import axios from 'axios';

const ManageProgram = () => {
    const { id: programId } = useParams();
    const [programData, setProgramData] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/programs/${programId}`);
                setProgramData(response.data);
            } catch (error) {
                console.error('Error fetching program data:', error);
            }
        };

        if (programId) {
            fetchProgram();
        }
    }, [programId]);

    const handleUpdateProgram = async (updatedData) => {
        try {
            await axios.put(`http://localhost:5000/api/programs/${programId}`, updatedData);
            alert('Program updated successfully!');
            navigate('/programs'); 
        } catch (error) {
            console.error('Error updating program:', error);
            alert('Failed to update the program.');
        }
    };

    return (
        <div className="program-form-container">
            <h3 className="program-form-title">Manage Program</h3>
            {programData ? (
                <ProgramForm 
                    initialData={programData} 
                    onSubmit={handleUpdateProgram} 
                    submitLabel="Update" 
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ManageProgram;
