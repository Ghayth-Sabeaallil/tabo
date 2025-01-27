import Footer from "../Components/Footer";
import Header from "../Components/Header"

function NoPageFound() {
    document.title = "طابو - غير متواجد";

    return (
        <>
            <Header />
            <div className="p-2 flex justify-center h-full items-center flex-col gap-4">
                <img src="/404.png" alt="404 Error" className="w-2/4" />
                <div className="text-5xl font-bold font-Amiri text-header">الصفحة غير متوفرة</div>
                <a href="/"><div className="text-4xl font-bold font-Amiri text-text bg-header p-2 rounded">العودة الى الرئيسية</div></a>
            </div>
            <Footer />
        </>
    )
}

export default NoPageFound