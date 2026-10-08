const avantages = [
  {
    icon: "fa-chalkboard-user",
    title: "تكوين شامل",
    desc: "نظري وتطبيقي واختبارات تحضيرية",
  },
  {
    icon: "fa-users",
    title: "مدربون مجربون",
    desc: "أساليب تعليم مبسطة وصبورة",
  },
  {
    icon: "fa-clock",
    title: "أوقات مرنة",
    desc: "نناسب انشغالاتكم",
  },
  {
    icon: "fa-map-marker-alt",
    title: "موقع سهل الوصول",
    desc: "في قلب قلعة السراغنة",
  },
];

export default function Avantages() {
  return (
    <section className="px-[5%] py-16 bg-slate-100">
      <h2 className="section-title">
        <i className="fas fa-bullseye me-2"></i>
        لماذا مؤسسة السملالي؟
      </h2>
      <div className="flex gap-8 justify-center flex-wrap">
        {avantages.map((a, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-3xl text-center w-[250px] shadow-xl hover:-translate-y-2 transition-transform"
          >
            <i className={`fas ${a.icon} text-5xl text-accent mb-4`}></i>
            <h3 className="text-primary font-bold text-lg mb-2">{a.title}</h3>
            <p>{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
