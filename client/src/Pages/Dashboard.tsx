import DashboardComponent from "../Components/DashboardComponent";
import Footer from "../Components/Footer";
import Header from "../Components/Header";


const DashboardPage: React.FC = () => {
    return (
        <>
            <Header />
            <DashboardComponent />
            <Footer />
        </>
    );
};

export default DashboardPage;