import Footer from "../Components/Footer";
import Header from "../Components/Header"
import Item from "../Components/Item";

function ItemPage() {
    document.title = "طابو - الرئيسية";

    return (
        <>
            <Header />
            <Item />
            <Footer />
        </>

    )
}

export default ItemPage