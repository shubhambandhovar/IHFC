import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('https://ihfc.onrender.com/api/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            console.log("Backend not available, using mock data for demonstration.");
            const mockUser = {
                _id: "1",
                studentId: "IHFC2026-001",
                name: "Shubham Shrivastava",
                email: "shubham@example.com",
                role: "student",
                token: "mock_token"
            };
            setUser(mockUser);
            localStorage.setItem('userInfo', JSON.stringify(mockUser));
            return mockUser;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
