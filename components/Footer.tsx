export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white px-[5%] pt-12 pb-4">
      <div className="flex justify-between flex-wrap gap-8 mb-8">
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <i className="fas fa-car text-accent"></i>
            مؤسسة السملالي
          </h3>
          <p>لتعليم السياقة وقانون السير</p>
        </div>
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-bold mb-2">روابط سريعة</h3>
          <p>
            <a href="#accueil" className="hover:text-accent">
              الرئيسية
            </a>
          </p>
          <p>
            <a href="#formations" className="hover:text-accent">
              التكوينات
            </a>
          </p>
          <p>
            <a href="#reservation" className="hover:text-accent">
              حجز موعد
            </a>
          </p>
        </div>
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-bold mb-2">تابعونا</h3>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://www.facebook.com/share/1ChYTuaVwF/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/auto.ecole_semlali"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.tiktok.com/@auto.ecole_semlali"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-slate-700">
        <p>
          2025 مؤسسة السملالي لتعليم السياقة وقانون السير. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
