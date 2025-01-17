import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CardDetailsProps } from "../Lib/DataType";
import { getById } from "../Lib/getById";
import { SyncLoader } from "react-spinners";

const Item = () => {
    const [item, setItem] = useState<CardDetailsProps>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    useEffect(() => {
        const fetchData = async () => {
            const itemData = getById(id!);
            setItem(await itemData);
        };
        fetchData();
    }, []);
    return (
        <>
            <div className="flex justify-center items-center h-full"> {item ? <div className="text-3xl">{item?.description}</div> : <SyncLoader
                color={"#0D5C02"}
                loading={true}
                size={20}
                aria-label="Loading Spinner"
                data-testid="SyncLoader"
            />}</div>
        </>

    );
};

export default Item;
