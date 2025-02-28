import Footer from "../Components/Footer";
import Header from "../Components/Header"

function AboutPage() {
    document.title = "طابو - حول";

    return (
        <>
            <Header />
            <main className="p-2 flex justify-center h-full">
                <div className=" font-bold font-Amiri text-text text-base sm:text-base md:text-2xl flex flex-col overflow-auto p-4 gap-2 bg-header w-full rounded-lg justify-around items-center">
                    <h1 className="text-4xl">حول</h1>
                    <h2 className="text-xl">مرحبًا بك في موقعنا، المنصة المثالية التي تتيح لك عرض والإطلاع على إعلانات الشقق، الفلل، والأراضي بمختلف المناطق. نحن نقدم مساحة مخصصة لعرض العقارات بمواصفاتها المختلفة، مما يسهل على المهتمين الوصول إلى خيارات تناسب احتياجاتهم وميزانياتهم</h2>
                    <h2 className="text-xl">يرجى التنويه إلى أن دورنا يقتصر فقط على توفير هذه المنصة الإعلانية لربط المعلنين بالمشترين المحتملين. نحن لا نتدخل في تفاصيل العمليات التجارية أو العقود، بل نتيح لك كمسؤول عن إعلانك التواصل المباشر مع الأطراف الأخرى لإتمام أي معاملات</h2>

                    <h2 className="text-xl">المستخدمون مسؤولون بالكامل عن مراجعة صحة ودقة المعلومات المدرجة في الإعلانات، وكذلك عن التفاوض وإتمام الصفقات وفقًا لرغباتهم. نوصي دائمًا باتخاذ الحذر والتحقق من جميع التفاصيل المتعلقة بالعقار قبل اتخاذ أي قرارات</h2>

                    <h2 className="text-xl">هدفنا هو تسهيل الوصول إلى العقارات التي تناسبك بطريقة مرنة وسهلة الاستخدام، مما يجعل عملية البحث أو الإعلان أكثر بساطة وكفاءة. إذا كنت بحاجة إلى أي استفسار أو دعم تقني، فريقنا هنا لخدمتك. شكراً لاختيارك موقعنا</h2>
                </div>

            </main>
            <Footer />
        </>
    )
}

export default AboutPage