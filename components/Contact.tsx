export default function Contact() {
  return (
    <section id="contact" className="px-[5%] py-16">
      <h2 className="section-title">
        <i className="fas fa-map-marker-alt me-2"></i>
        اتصل بنا
      </h2>
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="flex-1 min-w-[250px] space-y-3">
          <p>
            <i className="fas fa-map-marker-alt text-accent me-2"></i>
            <strong>العنوان:</strong> تجزئة ادراع العياشي 01 رقم 142، قلعة
            السراغنة
          </p>
          <p>
            <i className="fas fa-phone text-accent me-2"></i>
            <strong>الهاتف:</strong> +212 698-979200
          </p>
          <p>
            <i className="fab fa-facebook text-accent me-2"></i>
            <strong>فيسبوك:</strong>{" "}
            <a
              href="https://www.facebook.com/share/1ChYTuaVwF/"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              Auto Ecole Semlali
            </a>
          </p>
          <p>
            <i className="fab fa-instagram text-accent me-2"></i>
            <strong>إنستغرام:</strong>{" "}
            <a
              href="https://www.instagram.com/auto.ecole_semlali"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              @auto.ecole_semlali
            </a>
          </p>
          <p>
            <i className="fab fa-tiktok text-accent me-2"></i>
            <strong>تيك توك:</strong>{" "}
            <a
              href="https://www.tiktok.com/@auto.ecole_semlali"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              @auto.ecole_semlali
            </a>
          </p>
        </div>
        <div className="flex-[2] min-w-[300px]">
          <iframe
            src="https://maps.google.com/maps?q=32.0364,-7.6103&z=15&output=embed"
            width="100%"
            height="250"
            className="border-0 rounded-2xl"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
