import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import Sidebar from '../Sidebar/Sidebar'; 
import './Dashboard.css';
import { Button } from 'primereact/button';
import axios from 'axios'; 

export default function Dashboard() {
    const [programs, setPrograms] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        // Fetch data from the backend API
        axios.get('http://localhost:5000/api/programs')
            .then(response => {
                setPrograms(response.data);
            })
            .catch(error => {
                console.error('Error fetching the programs:', error);
            });
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const statusBodyTemplate = (rowData) => {
        if (rowData.status === 1) {
            return 'DRAFT';
        } else if (rowData.status === 0) {
            return 'LIVE';
        } else {
            return 'UNKNOWN';
        }
    };

    // Duplicate a program
    const duplicateProgram = (rowData) => {
        const duplicatedProgram = { 
            program_name: rowData.program_name, 
            program_short_description: rowData.program_short_description, 
            program_start_date: rowData.program_start_date, 
            program_end_date: rowData.program_end_date, 
            status: rowData.status 
        };
        axios.post('http://localhost:5000/api/programs', duplicatedProgram)
            .then(response => {
                setPrograms([...programs, response.data]); // Update the frontend
            })
            .catch(error => {
                console.error('Error duplicating the program:', error);
            });
    };

    // Delete a program
    const deleteProgram = (rowData) => {    
        axios.delete(`http://localhost:5000/api/programs/${rowData._id}`)
            .then(response => {
                setPrograms(programs.filter(program => program._id !== rowData._id)); // Remove the deleted program from the state
            })
            .catch(error => {
                console.error('Error deleting the program:', error);
            });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button 
                    label="Duplicate" 
                    className="p-button-rounded p-button-success p-mr-2" 
                    onClick={() => duplicateProgram(rowData)}
                />
                <Button 
                    label="Delete" 
                    className="p-button-rounded p-button-danger" 
                    onClick={() => deleteProgram(rowData)}
                />
            </div>
        )
    };

    const handleSearch = () => {
        setGlobalFilter(searchInput);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '200px', flexGrow: 1 }}>
                <h3 className="manage-programs-title">Manage Programs</h3>
                <div className="table-filter">
                    <InputText 
                        type="search" 
                        value={searchInput}
                        onInput={(e) => setSearchInput(e.target.value)}
                        placeholder="Search..."
                        className="search-input"
                    />
                    <Button 
                        className='search-button'
                        label="Search"
                        text
                        raised
                        onClick={handleSearch}
                    />
                </div>
                <div className="card">
                    <DataTable 
                        value={programs} 
                        paginator 
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        tableStyle={{ minWidth: '50rem' }}
                        globalFilter={globalFilter}
                        emptyMessage="No programs found."
                    >
                        <Column field="program_name" header="Program Name" style={{ width: '25%' }}></Column>
                        <Column 
                            field="program_short_description" 
                            header="Description" 
                            style={{ width: '25%' }} 
                        ></Column>
                        <Column 
                            field="program_start_date" 
                            header="Start Date" 
                            style={{ width: '25%' }} 
                            body={(rowData) => formatDate(rowData.program_start_date)} 
                        ></Column>
                        <Column 
                            field="program_end_date" 
                            header="End Date" 
                            style={{ width: '25%' }} 
                            body={(rowData) => formatDate(rowData.program_end_date)} 
                        ></Column>
                        <Column 
                            field="status" 
                            header="Status" 
                            body={statusBodyTemplate} 
                            style={{ width: '25%' }} 
                        ></Column>
                        <Column 
                            body={actionBodyTemplate}                        
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
