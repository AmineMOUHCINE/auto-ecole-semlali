export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative text-white text-center px-[5%] py-20"
      style={{
        background:
          "linear-gradient(rgba(15,23,42,0.8), rgba(30,58,138,0.8)), url(https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
        مؤسسة السملالي لتعليم السياقة وقانون السير
      </h1>
      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
        نرحب بكم في مؤسستنا، حيث نضع خبرتنا رهن إشارتكم لمساعدتكم على تعلم السياقة
        في أفضل الظروف، بثقة وأمان.
      </p>
      <a
        href="#reservation"
        className="inline-block bg-accent text-primary-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-accent-hover hover:scale-105 transition-all"
      >
        <i className="fas fa-rocket me-2"></i>
        ابدأ رحلتك الآن
      </a>
    </section>
  );
}
