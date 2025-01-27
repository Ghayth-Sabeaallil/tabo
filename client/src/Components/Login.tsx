import { useState } from "react";
import Button from "./Button";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

    };

    return (
        <form className="flex flex-col items-center justify-center h-screen" onSubmit={handleLogin}>
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
                <label htmlFor="password" className="text-header text-2xl font-medium block font-Amir">
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
            <Button type="submit" text={"تسجيل الدخول"} />
        </form>
    );
};

export default LoginForm;