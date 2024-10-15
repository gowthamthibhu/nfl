import './App.css';
import { Card } from 'primereact/card';
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from "primereact/floatlabel";
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/primereact.min.css';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const organization = [
        { name: 'RIT', code: 'RI' },
        { name: 'REC', code: 'RE' },
        { name: 'CIT', code: 'CI' }
    ];

    return (
        <div className="app-container">
            <Card title="Welcome Back" className="login-card">
                <p className='subheading'>Please continue to login</p>

                <div className="login-form">
                    <div className="input-field">
                        <FloatLabel>
                            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="username">Username</label>
                        </FloatLabel>
                    </div>

                    <div className="dropdown-organization">
                        <Dropdown value={selectedOrganization} onChange={(e) => setSelectedOrganization(e.value)} options={organization} optionLabel="name" 
                        showClear placeholder="Select an Organization" className="custom-dropdown" />
                    </div>

                    <div className="input-field">
                        <FloatLabel>
                            <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="password">Password</label>
                        </FloatLabel>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default App;
