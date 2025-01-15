import Card from "./Card";
import data from "../Lib/DummyData.json"
import { Link, useLocation } from "react-router-dom";
import Filter from "./Filter";

const Main = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const hasParams = queryParams.toString() !== '';
    if (hasParams) {
        const queryParamsCount = Array.from(queryParams.keys());
        queryParamsCount.map((item) => console.log(item))
    }
    return (
        <>
            <Filter />
            <main className="flex flex-col overflow-y-auto h-full pl-3 pr-3 pb-3 gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 bg-[#d2f2ce]">
                {data.map((item) => <Link key={item.id} to={`/item?id=${item.id}`}><Card key={item.id} description={item.description} primaryImage={item.images[0]} prise={item.prise} area={item.area} /></Link>)}
            </main>
        </>

    );
};

export default Main;
