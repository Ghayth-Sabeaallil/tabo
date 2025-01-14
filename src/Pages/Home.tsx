import Footer from "../Components/Footer";
import Header from "../Components/Header"
import Main from "../Components/Main";

function Home() {
    document.title = "طابو - الرئيسية";

    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>

    )
}

export default Home