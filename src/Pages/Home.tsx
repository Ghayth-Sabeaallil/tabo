import MainFilter from "../Components/MainFilter";
import Footer from "../Components/Footer";
import Header from "../Components/Header"

function HomePage() {
    document.title = "طابو - الرئيسية";

    return (
        <>
            <Header />
            <MainFilter />
            <Footer />
        </>

    )
}

export default HomePage