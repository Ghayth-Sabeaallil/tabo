import VillasSearch from "../Components/VillasSearch";
import Footer from "../Components/Footer";
import Header from "../Components/Header"

function Villas() {
    document.title = "طابو - شقق";

    return (
        <>
            <Header />
            <VillasSearch />
            <Footer />
        </>

    )
}

export default Villas