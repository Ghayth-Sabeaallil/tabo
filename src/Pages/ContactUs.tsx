import Footer from "../Components/Footer";
import Header from "../Components/Header"

function ContactUsPage() {
    document.title = "طابو - اتصل بنا";

    return (
        <>
            <Header />
            <main className="p-2 flex justify-center h-full">
                <div className="font-bold font-Amiri text-text text-base sm:text-base md:text-2xl flex flex-col overflow-auto p-4 gap-2 bg-header w-full rounded-lg justify-around items-center">
                    <h1 className="text-4xl">اتصل بنا</h1>

                    <h2 className="text-xl">نحن في موقعنا العقاري نسعى دائمًا لتوفير أفضل تجربة للمستخدمين. إذا كانت لديك أي استفسارات أو بحاجة إلى مساعدة بخصوص إعلاناتك أو أي تفاصيل أخرى متعلقة باستخدام الموقع، لا تتردد في التواصل معنا. نحن هنا لمساعدتك وتقديم الدعم اللازم</h2>

                    <h3 className="text-xl">البريد الإلكتروني: يمكنك إرسال استفساراتك إلى عنوان البريد الإلكتروني الخاص بنا [963tabo@gmail.com]، وسنقوم بالرد عليك في أقرب وقت ممكن</h3>
                    <h3 className="text-xl">الهاتف: إذا كنت تفضل التواصل بشكل مباشر، يمكنك الاتصال بنا على الرقم [00963935965801]</h3>

                    <h3 className="text-xl">نحن نقدر ملاحظاتك واقتراحاتك، ونسعى دائمًا لتحسين خدماتنا بما يتناسب مع احتياجاتك. شكراً لك على اختيارك لموقعنا العقاري</h3>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default ContactUsPage