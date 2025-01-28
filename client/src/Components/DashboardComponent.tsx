import { useEffect, useState } from "react";
import { getProfile } from "../service/authService";
import Logout from "./Logout";
import Login from "./Login";
import { AddItem } from "./AddItem";

const DashboardComponent: React.FC = () => {
    const [user, setUser] = useState<string | null>();


    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getProfile();
            if (response.username) {
                setUser(response.username);
            } else {
                setUser(null);
            }
        };
        fetchProfile();
    }, []);

    const handleLogin = (userData: string) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };
    return (
        <main className="flex h-screen w-full justify-center">
            {user ? (
                <div className="flex flex-col gap-4">
                    <AddItem />
                    <Logout onLogout={handleLogout} />
                </div>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </main>
    );
};

export default DashboardComponent;