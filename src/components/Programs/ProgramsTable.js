import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './ProgramsTable.css'; 


const ProgramsTable = ({ programs, globalFilter, actionBodyTemplate }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getStatusColor = (status) => {
        return status === 0 ? 'green' : 'red';
    };

    return (
        <div className="programs-card"> 
            <DataTable
                value={programs}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                globalFilter={globalFilter}
                emptyMessage="No programs found."
            >
                <Column field="program_name" header="Program Name" style={{ width: '25%' }} />
                <Column field="program_short_description" header="Description" style={{ width: '25%' }} />
                <Column
                    field="program_start_date"
                    header="Start Date"
                    style={{ width: '25%' }}
                    body={(rowData) => formatDate(rowData.program_start_date)}
                />
                <Column
                    field="program_end_date"
                    header="End Date"
                    style={{ width: '25%' }}
                    body={(rowData) => formatDate(rowData.program_end_date)}
                />
                <Column
                    field="status"
                    header="Status"
                    style={{ width: '25%' }}
                    body={(rowData) => (
                        <span style={{ color: getStatusColor(rowData.status) }}>
                            {rowData.status === 1 ? 'DRAFT' : 'LIVE'}
                        </span>
                    )}
                />
                <Column body={actionBodyTemplate} />
            </DataTable>
        </div>
    );
};

export default ProgramsTable;
