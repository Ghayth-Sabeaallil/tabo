import React from 'react';
import { logout } from '../service/authService';

interface LogoutProps {
    onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
    const handleLogout = async () => {
        try {
            await logout();
            onLogout();  // Notify parent to clear user data
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
