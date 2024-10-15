import './App.css';
import { Card } from 'primereact/card';
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from "primereact/floatlabel";
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/primereact.min.css';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const organization = [
        { name: 'RIT', code: 'RI' },
        { name: 'REC', code: 'RE' },
        { name: 'CIT', code: 'CI' }
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isPasswordValid = (password) => {
        return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
    };

    const handleSubmit = () => {
        if (!emailRegex.test(username)) {
            setErrorMessage('Please enter a valid email address.');
            setSuccessMessage('');
        } else if (!isPasswordValid(password)) {
            setErrorMessage('Password must be at least 8 characters long and contain both letters and numbers.');
            setSuccessMessage('');
        } else if (!selectedOrganization) {
            setErrorMessage('Please select an organization.');
            setSuccessMessage('');
        } else {
            setErrorMessage('');
            setSuccessMessage('Submitted successfully!');
        }
    };

    return (
        <div className="app-container">
            <Card title="Welcome Back" className="login-card">
                <p className='subheading'>Please continue to login</p>

                <div className="login-form">
                    <div className="input-field">
                        <FloatLabel>
                            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="username">Username (Email)</label>
                        </FloatLabel>
                    </div>

                    <div className="dropdown-organization">
                        <Dropdown value={selectedOrganization} onChange={(e) => setSelectedOrganization(e.value)} options={organization} optionLabel="name" 
                        showClear placeholder="Select an Organization" className="custom-dropdown" />
                    </div>

                    <div className="input-field">
                        <FloatLabel>
                            <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                            <label htmlFor="password">Password</label>
                        </FloatLabel>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <div className="submit-button">
                        <Button label="Submit" severity="submit" text raised onClick={handleSubmit} />
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default App;
