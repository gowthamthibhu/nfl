import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import Sidebar from '../Sidebar/Sidebar'; // Import the Sidebar component
import './Dashboard.css';
import { Button } from 'primereact/button';
import data from '../sfl_product.program_data.json';

export default function Dashboard() {
    const [programs, setPrograms] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');

    useEffect(() => {
        setPrograms(data);
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const statusBodyTemplate = (rowData) => {
        return rowData.status === 1 ? 'DRAFT' : 'LIVE';
    };

    const handleSearch = () => {
        // The search functionality is handled automatically by the DataTable with globalFilter
        console.log(globalFilter);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar /> {/* Include the Sidebar */}
            <div style={{ marginLeft: '200px', flexGrow: 1 }}> {/* Adjust margin to accommodate the sidebar */}
                <h3 className="manage-programs-title">Manage Programs</h3>
                <div className="table-filter">
                    <InputText 
                        type="search" 
                        onInput={(e) => setGlobalFilter(e.target.value)} 
                        placeholder="Search..." 
                        className="search-input" // Add a class for further styling
                    />
                    <Button 
                        className='search-button' // Add a class for further styling
                        label="Search" 
                        text 
                        raised 
                        onClick={handleSearch} // Optional: Trigger search logic here
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
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
