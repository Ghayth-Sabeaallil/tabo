import ContactPart from "../Components/ContactPart";
import Footer from "../Components/Footer";
import Header from "../Components/Header"

function ContactUs() {
    document.title = "طابو - اتصل بنا";

    return (
        <>
            <Header />
            <ContactPart />
            <Footer />
        </>
    )
}

export default ContactUs