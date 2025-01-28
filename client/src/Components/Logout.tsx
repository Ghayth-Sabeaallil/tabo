import React from 'react';
import { logout } from '../service/authService';
import Button from './Button';
import { CiLogout } from 'react-icons/ci';

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

    return <Button text="تسجيل الخروج" handleClick={handleLogout} icon={<CiLogout size={20} />} />;
};

export default Logout;
