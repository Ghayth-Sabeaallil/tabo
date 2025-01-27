import ApartmentsSearch from "../Components/ApartmentsSearch";
import Footer from "../Components/Footer";
import Header from "../Components/Header"

function Apartments() {
    document.title = "طابو - شقق";

    return (
        <>
            <Header />
            <ApartmentsSearch />
            <Footer />
        </>

    )
}

export default Apartments