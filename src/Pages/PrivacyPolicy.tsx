import Footer from "../Components/Footer";
import Header from "../Components/Header"

function PrivacyPolicyPage() {
    document.title = "طابو -  سياسة الخصوصية";

    return (
        <>
            <Header />
            <main className="bg-bg bg-opacity-50 p-2 flex justify-center h-full">
                <div className=" font-bold font-Amiri text-text text-base sm:text-base md:text-2xl flex flex-col overflow-auto p-4 gap-2 bg-header w-5/6 rounded-lg">
                    <h1 className="text-4xl">سياسة الخصوصية</h1>
                    <h2 className="text-3xl">جمع المعلومات</h2>
                    <h3 className="text-xl">لمعلومات التي تقدمها طوعًا: عند إنشاء حساب أو نشر إعلان أو التواصل معنا، قد نجمع معلومات مثل اسمك، رقم هاتفك، بريدك الإلكتروني، والتفاصيل المرتبطة بالعقار الذي ترغب في الإعلان عنه</h3>
                    <h3 className="text-xl">المعلومات التلقائية: عند زيارتك لموقعنا، نقوم بجمع بيانات غير شخصية مثل عنوان IP، نوع المتصفح، الصفحات التي تزورها، والوقت المستغرق في الموقع لتحسين تجربتك وتحليل الأداء</h3>
                    <h2 className="text-3xl">استخدام المعلومات</h2>
                    <h3 className="text-xl">تقديم الخدمات المطلوبة، مثل نشر الإعلانات أو تحسين واجهة المستخدم</h3>
                    <h3 className="text-xl">التواصل معك بشأن الإعلانات، أو الرد على استفساراتك</h3>
                    <h3 className="text-xl">تحليل وتحسين أداء الموقع لتوفير تجربة أفضل لجميع المستخدمين</h3>
                    <h3 className="text-xl">التأكد من سلامة وموثوقية الإعلانات المعروضة</h3>

                    <h2 className="text-3xl">مشاركة المعلومات</h2>
                    <h3 className="text-xl">نحن لا نشارك معلوماتك الشخصية مع أي أطراف ثالثة إلا في الحالات الضرورية، مثل الامتثال للقوانين أو تنفيذ شروط الاستخدام</h3>
                    <h3 className="text-xl">يمكن مشاركة بيانات غير شخصية (مثل الإحصاءات) لتحسين خدماتنا أو لأغراض التسويق</h3>


                    <h2 className="text-3xl">حماية المعلومات</h2>
                    <h3 className="text-xl">نحن نستخدم تقنيات حديثة وإجراءات أمنية مشددة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الاستخدام غير الصحيح</h3>



                    <h2 className="text-3xl">ملفات تعريف الارتباط</h2>
                    <h3 className="text-xl">قد نستخدم ملفات تعريف الارتباط لتحسين تجربتك على الموقع من خلال تذكر تفضيلاتك ومساعدتنا على فهم كيفية استخدامك للخدمات. يمكنك إدارة إعدادات ملفات تعريف الارتباط عبر متصفحك</h3>



                    <h2 className="text-3xl">حقوقك</h2>
                    <h3 className="text-xl">يحق لك الوصول إلى بياناتك الشخصية أو تعديلها أو حذفها عند الحاجة</h3>
                    <h3 className="text-xl">يمكنك طلب إيقاف استخدام معلوماتك لأغراض تسويقية في أي وقت</h3>

                    <h2 className="text-3xl">تحديثات سياسة الخصوصية</h2>
                    <h3 className="text-xl">قد يتم تحديث سياسة الخصوصية من وقت لآخر لتلبية المتطلبات القانونية أو لتحسين ممارساتنا. سيتم إعلامك بأي تغييرات جوهرية عبر الموقع</h3>

                </div>



            </main>
            <Footer />
        </>
    )
}

export default PrivacyPolicyPage