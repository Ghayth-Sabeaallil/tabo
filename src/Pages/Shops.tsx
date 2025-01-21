import ShopsSearch from "../Components/ShopsSearch";
import Footer from "../Components/Footer";
import Header from "../Components/Header"

function Shops() {
    document.title = "طابو - شقق";

    return (
        <>
            <Header />
            <ShopsSearch />
            <Footer />
        </>

    )
}

export default Shops