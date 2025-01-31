import { useEffect, useState } from "react";
import { getProfile } from "../service/authService";
import Logout from "./Logout";
import Login from "./Login";
import { AddItem } from "./AddItem";
import Card from "./Card";
import { formatPrice } from "../utils/formatPrice";
import { CardDetailsProps } from "../Lib/DataType";
import { getByCreator } from "../service/itemService";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const DashboardComponent: React.FC = () => {
    const [user, setUser] = useState<string | null>();
    const [items, setItems] = useState<CardDetailsProps[]>();
    const [triggerFetch, setTriggerFetch] = useState<boolean>(false); // Extra state to trigger useEffect

    useEffect(() => {
        const fetchData = async () => {
            const response = await getProfile();
            if (response.username) {
                setUser(response.username);
                const newItems = await getByCreator();
                if (JSON.stringify(items) !== JSON.stringify(newItems)) {
                    setItems(newItems);
                }
            } else {
                setUser(null);
            }
        };

        fetchData();
    }, [triggerFetch]);


    const handleItemAdded = () => {
        setTriggerFetch(prev => !prev);
    };
    const handleItemDeleted = () => {
        setTriggerFetch(prev => !prev); // Toggle state to trigger useEffect
    };


    const handleLogin = (userData: string) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };
    return (<>
        {user ? (<div className="flex flex-col gap-2 h-full">
            <div className="flex gap-2 justify-center p-2">
                <AddItem onItemAdded={handleItemAdded} user={user} />
                <Logout onLogout={handleLogout} />
            </div>
            {items?.length! > 0 && <main className="flex flex-col overflow-y-auto h-full p-2 gap-2 sm:grid sm:grid-cols-4 lg:grid-cols-4 border-2 border-header bg-bg m-2 rounded-lg">
                {items!.map((item) => <div key={item._id} ><Dropdown onItemDeleted={handleItemDeleted} _id={item._id!} /><Link to={`/item?id=${item._id}`}><Card key={item.id} city={item.city} images={item.images} price={formatPrice(item.price!)} area={item.area} /></Link></div>)}
            </main>}
        </div>
        ) : (
            <Login onLogin={handleLogin} />
        )}
    </>
    );
};

export default DashboardComponent;