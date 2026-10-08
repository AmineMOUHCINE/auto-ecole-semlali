"use client";

import { useState } from "react";

const formations = [
  "صنف A (موتوسيكلات)",
  "صنف B (سيارات)",
  "صنف C (شاحنات)",
  "صنف D (حافلات)",
  "صنف E (EC)",
];

const heures = [
  "08:30 - 10:00",
  "10:00 - 12:00",
  "15:30 - 17:00",
  "17:00 - 19:00",
  "19:00 - 21:00",
];

const emptyForm = {
  nom: "",
  telephone: "",
  email: "",
  formation: formations[1],
  date_rdv: "",
  heure: heures[0],
  message: "",
};

export default function ReservationForm() {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("تم إرسال طلبك بنجاح! سنتواصل معك قريبا لتأكيد الموعد.");
        setForm(emptyForm);
        setTimeout(() => setMessage(""), 6000);
      } else {
        setMessage(data.error || "حدث خطأ، حاول مرة أخرى.");
      }
    } catch {
      setMessage("خطأ في الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-3 border border-slate-300 rounded-xl font-tajawal focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <section id="reservation" className="px-[5%] py-16 bg-slate-100">
      <h2 className="section-title">
        <i className="fas fa-calendar-check me-2"></i>
        احجز موعدك الآن
      </h2>
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl mx-auto">
        <p className="text-center text-sm text-slate-500 mb-6">
          املأ النموذج وسنتصل بك في أقرب وقت
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">الاسم الكامل *</label>
            <input
              type="text"
              required
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">رقم الهاتف *</label>
            <input
              type="tel"
              required
              value={form.telephone}
              onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              className={inputClass}
              placeholder="+212 6XX-XXXXXX"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">البريد الإلكتروني *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">نوع التكوين *</label>
            <select
              value={form.formation}
              onChange={(e) => setForm({ ...form, formation: e.target.value })}
              className={inputClass}
            >
              {formations.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">تاريخ الموعد *</label>
              <input
                type="date"
                required
                value={form.date_rdv}
                onChange={(e) => setForm({ ...form, date_rdv: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">الوقت المناسب *</label>
              <select
                value={form.heure}
                onChange={(e) => setForm({ ...form, heure: e.target.value })}
                className={inputClass}
              >
                {heures.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">ملاحظات (اختياري)</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass}
              placeholder="أي معلومات إضافية..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-primary-dark p-3 rounded-full font-bold hover:bg-accent-hover transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>
                جار الإرسال...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane me-2"></i>
                إرسال الطلب
              </>
            )}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 text-center p-3 rounded-xl ${
              message.includes("بنجاح")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  );
}
