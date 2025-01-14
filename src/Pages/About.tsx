import AboutPart from "../Components/AboutPart";
import Footer from "../Components/Footer";
import Header from "../Components/Header"

function About() {
    document.title = "طابو - حول";

    return (
        <>
            <Header />
            <AboutPart />
            <Footer />
        </>
    )
}

export default About