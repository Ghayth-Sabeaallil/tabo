import { FormEvent, useState } from "react";
import Button from "./Button";
import { login } from '../service/authService';
import { IoIosLogIn } from "react-icons/io";

interface LoginProps {
    onLogin: (username: string) => void;
}

const LoginForm: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>('');



    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            if (response.msg === 'Login successful') {
                onLogin(response.username);
            }
            else {
                setError(response.error);
            }
        } catch (error: any) {
            setError(error.response.data.msg);
        }
    };

    return (
        <form className="flex flex-col items-center justify-center h-full" onSubmit={handleLogin}>
            <div className="mb-4">
                <label htmlFor="username" className="text-header text-2xl font-medium block font-Amir">
                    اسم المستخدم
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="اسم المستخدم"
                    className="p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="text-header text-2xl font-medium block font-Amir text">
                    كلمة المرور
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="كلمة السر"
                    className="p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                    required
                />
            </div>
            <Button type="submit" text={"تسجيل الدخول"} icon={<IoIosLogIn size={20} />} />
            {error && <p className="text-xl text-header">{error}</p>}
        </form>
    );
};

export default LoginForm;
