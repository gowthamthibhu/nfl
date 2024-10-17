import { Card } from 'primereact/card';
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import './Login.css';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from "primereact/floatlabel";
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/primereact.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        selectedOrganization: null
    });

    const [message, setMessage] = useState({
        error: '',
        success: ''
    });

    const navigate = useNavigate();
    
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
        const { username, password, selectedOrganization } = form;

        if (!emailRegex.test(username)) {
            setMessage({ error: 'Please enter a valid email address.', success: '' });
        } else if (!isPasswordValid(password)) {
            setMessage({ error: 'Password must be at least 8 characters long and contain both letters and numbers.', success: '' });
        } else if (!selectedOrganization) {
            setMessage({ error: 'Please select an organization.', success: '' });
        } else {
            setMessage({ error: '', success: 'Submitted successfully!' });
            navigate('/programs');
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [id]: value
        }));
    };

    const handleDropdownChange = (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            selectedOrganization: e.value
        }));
    };

    return (
        <div className="app-container">
            <Card title="Welcome Back" className="login-card">
                <p className='subheading'>Please continue to login</p>

                <div className="login-form">
                    <div className="input-field">
                        <FloatLabel>
                            <InputText id="username" value={form.username} onChange={handleInputChange} />
                            <label htmlFor="username">Username (Email)</label>
                        </FloatLabel>
                    </div>

                    <div className="dropdown-organization">
                        <Dropdown value={form.selectedOrganization} onChange={handleDropdownChange} options={organization} optionLabel="name" 
                        showClear placeholder="Select an Organization" className="custom-dropdown" />
                    </div>

                    <div className="input-field">
                        <FloatLabel>
                            <Password inputId="password" id="password" value={form.password} onChange={handleInputChange} toggleMask />
                            <label htmlFor="password">Password</label>
                        </FloatLabel>
                    </div>

                    {message.error && <p className="error-message">{message.error}</p>}
                    {message.success && <p className="success-message">{message.success}</p>}

                    <div className="submit-button">
                        <Button label="Submit" severity="submit" text raised onClick={handleSubmit} />
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Login;
