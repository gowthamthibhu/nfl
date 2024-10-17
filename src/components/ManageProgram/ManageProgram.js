import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import axios from 'axios';
import './ManageProgram.css';

const ManageProgram = () => {
    const { id: programId } = useParams(); // Get the program ID from the URL
    const [programName, setProgramName] = useState('');
    const [date, setDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [shortDescription, setShortDescription] = useState('');
    const [programDescription, setProgramDescription] = useState('');
    const [sequential, setSequential] = useState(true);

    useEffect(() => {
        const fetchProgramData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/programs/${programId}`);
                const program = response.data;
                setProgramName(program.program_name);
                setDate(new Date(program.program_start_date)); // Convert string to Date
                setEndDate(new Date(program.program_end_date)); // Convert string to Date
                setShortDescription(program.program_short_description);
                setProgramDescription(program.program_description);
                setSequential(program.sequential);
            } catch (error) {
                console.error('Error fetching program data:', error);
            }
        };

        if (programId) {
            fetchProgramData();
        }
    }, [programId]);

    const handleSubmit = async () => {
        // Validate required fields
        if (!programName || !date || !endDate || !shortDescription || !programDescription) {
            alert('Please fill out all required fields.');
            return;
        }

        const updatedProgram = {
            program_name: programName,
            program_start_date: date,
            program_end_date: endDate,
            program_short_description: shortDescription,
            program_description: programDescription,
            sequential
        };

        try {
            const response = await axios.put(`http://localhost:5000/api/programs/${programId}`, updatedProgram);
            console.log('Program updated successfully:', response.data);
            // Optionally, you can redirect or show a success message here
        } catch (error) {
            console.error('Error updating program:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="manage-program-container">
            <h3 className="manage-program-title">Manage Program</h3>

            <div className="manage-program-form">
                <div className="form-program-field">
                    <label htmlFor="program-name">Program Name *</label>
                    <InputText id="program-name" value={programName} onChange={(e) => setProgramName(e.target.value)} className="input-full-width" />
                </div>

                <div className="form-field">
                    <label htmlFor="start-date">Start Date *</label>
                    <Calendar id="start-date" value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" showIcon />
                </div>

                <div className="form-field">
                    <label htmlFor="end-date">End Date *</label>
                    <Calendar id="end-date" value={endDate} onChange={(e) => setEndDate(e.value)} dateFormat="dd/mm/yy" showIcon />
                </div>

                <div className="form-field">
                    <label htmlFor="short-description">Program Short Description *</label>
                    <InputText id="short-description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="input-full-width" />
                </div>

                <div className="form-field">
                    <label htmlFor="program-description">Program Description *</label>
                    <InputText id="program-description" value={programDescription} onChange={(e) => setProgramDescription(e.target.value)} className="input-full-width input-description" />
                </div>

                <div className="form-field sequential-field">
                    <label>Sequential</label>
                    <ToggleButton checked={sequential} onChange={(e) => setSequential(e.value)} onLabel="Yes" offLabel="No" />
                </div>

                <div className="form-footer">
                    <Button label="Submit" className="p-button-success" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default ManageProgram;