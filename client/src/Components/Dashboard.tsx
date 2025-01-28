import { useEffect, useState } from "react";
import { getProfile } from "../service/authService";
import Logout from "./Logout";
import Login from "./Login";

const Dashboard: React.FC = () => {
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
        <main className="flex h-full justify-center">
            <div>
                {user ? (
                    <div>
                        <h2>Welcome, {user}</h2>
                        <Logout onLogout={handleLogout} />
                    </div>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </div>
        </main>
    );
};

export default Dashboard;