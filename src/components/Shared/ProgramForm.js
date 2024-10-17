import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import './ProgramForm.css';

// ProgramForm.js

const ProgramForm = ({ initialData, onSubmit, submitLabel }) => {
    const [programName, setProgramName] = useState('');
    const [date, setDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [shortDescription, setShortDescription] = useState('');
    const [programDescription, setProgramDescription] = useState('');
    const [sequential, setSequential] = useState(true);
    const [isLive, setIsLive] = useState(false); 

    useEffect(() => {
        if (initialData) {
            setProgramName(initialData.program_name || '');
            setDate(new Date(initialData.program_start_date) || null);
            setEndDate(new Date(initialData.program_end_date) || null);
            setShortDescription(initialData.program_short_description || '');
            setProgramDescription(initialData.program_description || '');
            setSequential(initialData.sequential || true);
            setIsLive(initialData.is_live || false); // Set initial value for live/draft toggle
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!programName || !date || !endDate || !shortDescription || !programDescription) {
            alert('Please fill out all required fields.');
            return;
        }

        const programData = {
            program_name: programName,
            program_start_date: date,
            program_end_date: endDate,
            program_short_description: shortDescription,
            program_description: programDescription,
            sequential,
            is_live: isLive // Include is_live value in programData
        };

        onSubmit(programData);
    };

    return (
        <div className="program-form">
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

            <div className="form-field">
                <label>Live/Draft</label>
                <ToggleButton checked={isLive} onChange={(e) => setIsLive(e.value)} onLabel="Live" offLabel="Draft" />
            </div>

            <div className="form-footer">
                <Button label={submitLabel} className="p-button-success" onClick={handleSubmit} />
            </div>
        </div>
    );
};

ProgramForm.propTypes = {
    initialData: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
};

export default ProgramForm;
