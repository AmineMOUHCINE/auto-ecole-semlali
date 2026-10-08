const horaires = [
  { icon: "fa-sun", title: "الفترة الصباحية", value: "08:30 - 13:00" },
  { icon: "fa-moon", title: "الفترة المسائية", value: "15:30 - 21:00" },
  {
    icon: "fa-calendar-alt",
    title: "أيام العمل",
    value: "الاثنين إلى السبت\nالأحد: مغلق",
  },
];

export default function Horaires() {
  return (
    <section className="px-[5%] py-16">
      <h2 className="section-title">
        <i className="fas fa-clock me-2"></i>
        أوقات العمل
      </h2>
      <div className="flex justify-center gap-8 flex-wrap">
        {horaires.map((h, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-3xl text-center min-w-[200px] shadow-xl"
          >
            <i className={`fas ${h.icon} text-3xl text-accent mb-4`}></i>
            <h3 className="mb-2 font-bold text-lg">{h.title}</h3>
            <p className="whitespace-pre-line">{h.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
