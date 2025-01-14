import Card from "./Card";
import data from "../Lib/DummyData.json"
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <main className="flex flex-col overflow-y-auto h-5/6 p-3 gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => <Link to={`/item?id=${item.id}`}><Card description={item.description} primaryImage={item.images[0]} prise={item.prise} area={item.area} /></Link>)}
        </main>
    );
};

export default Main;
