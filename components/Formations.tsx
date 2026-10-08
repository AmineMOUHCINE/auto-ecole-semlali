const formations = [
  { icon: "fa-motorcycle", title: "صنف A", desc: "موتوسيكلات" },
  { icon: "fa-car", title: "صنف B", desc: "سيارات" },
  { icon: "fa-truck", title: "صنف C", desc: "شاحنات" },
  { icon: "fa-bus", title: "صنف D", desc: "حافلات" },
  { icon: "fa-trailer", title: "صنف E (EC)", desc: "شاحنات بمقطورة" },
];

export default function Formations() {
  return (
    <section id="formations" className="px-[5%] py-16">
      <h2 className="section-title">
        <i className="fas fa-id-card me-2"></i>
        الأصناف المتوفرة
      </h2>
      <div className="flex gap-6 justify-center flex-wrap">
        {formations.map((f, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl text-center w-[180px] shadow-lg hover:scale-105 hover:border-b-4 hover:border-accent transition-all cursor-pointer"
          >
            <i className={`fas ${f.icon} text-5xl text-primary`}></i>
            <h3 className="my-2 font-bold text-lg">{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
