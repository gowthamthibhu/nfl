// src/components/Programs/Programs.js
import React, { useState, useRef } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Button } from 'primereact/button';
import { usePrograms } from '../../hooks/usePrograms';
import ProgramsTable from './ProgramsTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import './ProgramsTable.css';

export default function Programs() {
    const { programs, loading, error, setPrograms } = usePrograms();
    const [globalFilter, setGlobalFilter] = useState('');
    const navigate = useNavigate();
    const menuRefs = useRef({}); // Refs for the menu items

    const handleDuplicate = async (rowData) => {
        const duplicatedProgram = {
            program_name: rowData.program_name,
            program_short_description: rowData.program_short_description,
            program_start_date: rowData.program_start_date,
            program_end_date: rowData.program_end_date,
            status: rowData.status,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/programs', duplicatedProgram);
            setPrograms((prev) => [...prev, response.data]);
        } catch (error) {
            console.error('Error duplicating the program:', error);
        }
    };

    const handleDelete = async (rowData) => {
        try {
            await axios.delete(`http://localhost:5000/api/programs/${rowData._id}`);
            setPrograms((prev) => prev.filter(program => program._id !== rowData._id));
        } catch (error) {
            console.error('Error deleting the program:', error);
        }
    };

    const handleEdit = (rowData) => {
        navigate(`/manageprogram/${rowData._id}`);
    };

    const handleSearch = (e) => {
        setGlobalFilter(e.target.value);
    };

    const handleCreate = () => {
        navigate('/CreateProgram');
    };

    const actionBodyTemplate = (rowData) => {
        const menuItems = [
            {
                label: 'Duplicate',
                icon: 'pi pi-copy',
                command: () => handleDuplicate(rowData),
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => handleDelete(rowData),
            },
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => handleEdit(rowData),
            },
        ];

        if (!menuRefs.current[rowData._id]) {
            menuRefs.current[rowData._id] = React.createRef();
        }

        return (
            <div>
                <Menu model={menuItems} popup ref={menuRefs.current[rowData._id]} />
                <Button
                    icon="pi pi-ellipsis-v"
                    className="p-button-rounded p-button-text"
                    onClick={(event) => menuRefs.current[rowData._id].current.toggle(event)}
                />
            </div>
        );
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '200px', flexGrow: 1 }}>
                <div className="header-container">
                    <h3 className="programs-title">Programs</h3>
                </div>

                <div className="table-filter">
                    <InputText
                        type="search"
                        value={globalFilter}
                        onInput={handleSearch}
                        placeholder="Search..."
                        className="search-input"
                        
                    />
                    <Button className="create-program-button" label="Create" onClick={handleCreate} />
                    
                </div>

                {loading && <p>Loading programs...</p>}
                {error && <p>{error}</p>}

                <ProgramsTable
                    programs={programs}
                    globalFilter={globalFilter}
                    actionBodyTemplate={actionBodyTemplate} // Pass actionBodyTemplate
                />
            </div>
        </div>
    );
}
