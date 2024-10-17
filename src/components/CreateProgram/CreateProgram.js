import React, { useState } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import './CreateProgram.css'; 
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios'; // Import axios

export default function CreateProgram() {
    const [programName, setProgramName] = useState('');
    const [date, setDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [shortDescription, setShortDescription] = useState('');
    const [programDescription, setProgramDescription] = useState('');
    const [sequential, setSequential] = useState(true);

    const items = [
        { label: 'Dashboard' },
        { label: 'Programs' },
        { label: 'Create Program' }
    ];

    const home = { icon: 'pi pi-home', url: '/' };

    const handleSubmit = async () => {
        // Validate that required fields are filled
        if (!programName || !date || !endDate || !shortDescription || !programDescription) {
            alert('Please fill out all required fields.');
            return;
        }
    
        // Format the dates to 'YYYY-MM-DD'
        const formattedStartDate = date.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
    
        const programData = {
            program_name: programName,
            program_start_date: formattedStartDate,
            program_end_date: formattedEndDate,
            program_short_description: shortDescription,
            program_description: programDescription,
            sequential
        };
    
        try {
            const response = await axios.post('http://localhost:5000/api/programs', programData);
            console.log('Program added successfully:', response.data);
            alert('Program added successfully!');
    
            // Optionally, redirect or clear the form after successful submission
            setProgramName('');
            setDate(null);
            setEndDate(null);
            setShortDescription('');
            setProgramDescription('');
            setSequential(true);
        } catch (error) {
            console.error('There was an error adding the program:', error);
            alert('Error adding the program. Please try again.');
        }
    };
    

    return (
        <div className="create-program-container">
            <Sidebar />
            <div className="content">
                <BreadCrumb model={items} home={home} />
                <h3 className="create-programs-title">Create Program</h3>

                <div className="create-program-form">
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
        </div>
    );  
}