import Footer from "../Components/Footer";
import Header from "../Components/Header"
import Main from "../Components/Main";

function Item() {
    document.title = "طابو";

    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    )
}

export default Item