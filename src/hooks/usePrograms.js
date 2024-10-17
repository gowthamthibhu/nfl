// src/hooks/usePrograms.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePrograms = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/programs');
                setPrograms(response.data);
            } catch (error) {
                setError('Error fetching the programs');
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    return { programs, loading, error, setPrograms };
};

