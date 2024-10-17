import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import Sidebar from '../Sidebar/Sidebar'; 
import './Programs.css';
import 'primereact/resources/primereact.min.css';         
import 'primeicons/primeicons.css'; 
import { Menu } from 'primereact/menu'; 
import { Button } from 'primereact/button';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export default function Programs() {
    const [programs, setPrograms] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    
    const menuRefs = useRef({});

    useEffect(() => {
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
                setPrograms([...programs, response.data]); 
            })
            .catch(error => {
                console.error('Error duplicating the program:', error);
            });
    };

    const deleteProgram = (rowData) => {    
        axios.delete(`http://localhost:5000/api/programs/${rowData._id}`)
            .then(response => {
                setPrograms(programs.filter(program => program._id !== rowData._id)); 
            })
            .catch(error => {
                console.error('Error deleting the program:', error);
            });
    };

    const editProgram = (rowData) => {
        navigate(`/manageprogram/${rowData._id}`); 
    };

    const actionBodyTemplate = (rowData) => {
        if (!menuRefs.current[rowData._id]) {
            menuRefs.current[rowData._id] = React.createRef();
        }

        const menuItems = [
            {
                label: 'Duplicate',
                icon: 'pi pi-copy',
                command: () => duplicateProgram(rowData)
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => deleteProgram(rowData)
            },
            {
                label: 'Edit',
                icon: 'pi pi-pencil', // Change icon to pencil for edit
                command: () => editProgram(rowData) // Use editProgram function
            }
        ];

        return (
            <div>
                <Menu model={menuItems} popup ref={menuRefs.current[rowData._id]} id={`popup_menu_${rowData._id}`} />
                <Button 
                    icon="pi pi-ellipsis-v" 
                    className="p-button-rounded p-button-text"
                    onClick={(event) => menuRefs.current[rowData._id].current.toggle(event)} 
                />
            </div>
        );
    };

    const handleSearch = () => {
        setGlobalFilter(searchInput);
    };

    const handleCreate = () => {
        navigate('/CreateProgram');
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '200px', flexGrow: 1 }}>
                
                {/* Header section for title and Create button */}
                <div className="header-container">
                    <h3 className="programs-title">Programs</h3>
                    <Button 
                        className="create-program-button"
                        label="Create"
                        text
                        raised
                        onClick={handleCreate}
                    />
                </div>

                {/* Search Bar */}
                <div className="table-filter">
                    <InputText 
                        type="search" 
                        value={searchInput}
                        onInput={(e) => setSearchInput(e.target.value)}
                        placeholder="Search..."
                        className="search-input"
                    />
                    <Button 
                        className="search-button"
                        label="Search"
                        text
                        raised
                        onClick={handleSearch}
                    />
                </div>

                {/* Data Table */}
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
