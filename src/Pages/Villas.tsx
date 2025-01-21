import VillasSearch from "../Components/VillasSearch";
import Footer from "../Components/Footer";
import Header from "../Components/Header"

function Villas() {
    document.title = "طابو - فيلا";

    return (
        <>
            <Header />
            <VillasSearch />
            <Footer />
        </>

    )
}

export default Villas