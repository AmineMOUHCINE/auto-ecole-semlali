"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { Reservation } from "@/types";

export default function AdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Reservation | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const loadData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/admin/login");
      return;
    }

    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    setReservations(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const updateStatut = async (id: string, statut: string) => {
    const { error } = await supabase
      .from("reservations")
      .update({ statut })
      .eq("id", id);

    if (!error) {
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statut: statut as Reservation["statut"] } : r))
      );
      if (selected?.id === id) setSelected({ ...selected, statut: statut as Reservation["statut"] });
    }
  };

  const saveNotes = async (id: string, notes_admin: string) => {
    const { error } = await supabase
      .from("reservations")
      .update({ notes_admin })
      .eq("id", id);

    if (!error) {
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, notes_admin } : r))
      );
    }
  };

  const deleteReservation = async (id: string) => {
    if (!confirm("هل تريد حذف هذا الطلب نهائيا؟")) return;
    const { error } = await supabase.from("reservations").delete().eq("id", id);
    if (!error) {
      setReservations((prev) => prev.filter((r) => r.id !== id));
      setSelected(null);
    }
  };

  const filtered = reservations.filter((r) => {
    const matchStatut = filter === "all" || (r.statut ?? "nouveau") === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.nom.toLowerCase().includes(q) ||
      r.telephone.includes(q) ||
      r.email.toLowerCase().includes(q);
    return matchStatut && matchSearch;
  });

  const stats = {
    total: reservations.length,
    nouveau: reservations.filter((r) => (r.statut ?? "nouveau") === "nouveau").length,
    contacte: reservations.filter((r) => r.statut === "contacte").length,
    confirme: reservations.filter((r) => r.statut === "confirme").length,
    annule: reservations.filter((r) => r.statut === "annule").length,
  };

  const badge = (statut?: string) => {
    const map: Record<string, { label: string; cls: string }> = {
      nouveau: { label: "جديد", cls: "bg-blue-100 text-blue-800" },
      contacte: { label: "تم الاتصال", cls: "bg-purple-100 text-purple-800" },
      confirme: { label: "مؤكد", cls: "bg-green-100 text-green-800" },
      annule: { label: "ملغى", cls: "bg-red-100 text-red-800" },
      termine: { label: "منتهي", cls: "bg-slate-200 text-slate-700" },
    };
    const s = map[statut ?? "nouveau"];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${s.cls}`}>
        {s.label}
      </span>
    );
  };

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString("ar-MA") : "-";

  const formatDateTime = (d: string) =>
    d ? new Date(d).toLocaleString("ar-MA") : "-";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-primary text-lg">جار التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100" dir="rtl">
      <header className="bg-gradient-to-br from-primary-dark to-primary text-white px-[5%] py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">لوحة التحكم</h1>
            <p className="text-sm text-accent">
              مؤسسة السملالي لتعليم السياقة
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors text-sm font-medium"
          >
            <i className="fas fa-sign-out-alt me-2"></i>
            خروج
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "المجموع", value: stats.total, color: "text-primary" },
            { label: "جديد", value: stats.nouveau, color: "text-blue-600" },
            { label: "تم الاتصال", value: stats.contacte, color: "text-purple-600" },
            { label: "مؤكد", value: stats.confirme, color: "text-green-600" },
            { label: "ملغى", value: stats.annule, color: "text-red-600" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl shadow text-center hover:shadow-lg transition-shadow"
            >
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-2xl shadow mb-4">
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="text"
              placeholder="ابحث بالاسم أو الهاتف أو البريد..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "all", label: "الكل" },
                { key: "nouveau", label: "جديد" },
                { key: "contacte", label: "تم الاتصال" },
                { key: "confirme", label: "مؤكد" },
                { key: "annule", label: "ملغى" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === f.key
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow text-center">
            <i className="fas fa-inbox text-5xl text-slate-300 mb-3"></i>
            <p className="text-slate-500">لا توجد طلبات مطابقة.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-3 whitespace-nowrap">الاسم</th>
                    <th className="p-3 whitespace-nowrap">الهاتف</th>
                    <th className="p-3 whitespace-nowrap">البريد</th>
                    <th className="p-3 whitespace-nowrap">التكوين</th>
                    <th className="p-3 whitespace-nowrap">التاريخ</th>
                    <th className="p-3 whitespace-nowrap">الحالة</th>
                    <th className="p-3 whitespace-nowrap">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-medium">{r.nom}</td>
                      <td className="p-3">
                        <a
                          href={`tel:${r.telephone}`}
                          className="text-primary hover:underline whitespace-nowrap"
                          dir="ltr"
                        >
                          {r.telephone}
                        </a>
                      </td>
                      <td className="p-3">
                        <a
                          href={`mailto:${r.email}`}
                          className="text-primary hover:underline text-sm"
                        >
                          {r.email}
                        </a>
                      </td>
                      <td className="p-3 text-sm">{r.formation}</td>
                      <td className="p-3 text-sm whitespace-nowrap">
                        {formatDate(r.date_rdv)}
                      </td>
                      <td className="p-3">{badge(r.statut)}</td>
                      <td className="p-3">
                        <button
                          onClick={() => setSelected(r)}
                          className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm hover:bg-primary-dark transition-colors"
                        >
                          <i className="fas fa-eye me-1"></i>
                          عرض
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-primary-dark to-primary text-white p-6 rounded-t-3xl flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">{selected.nom}</h2>
                <p className="text-accent text-sm">تفاصيل الطلب</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-2xl hover:text-accent"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">
                    <i className="fas fa-phone me-1"></i>
                    الهاتف
                  </p>
                  <a
                    href={`tel:${selected.telephone}`}
                    className="font-bold text-primary hover:underline"
                    dir="ltr"
                  >
                    {selected.telephone}
                  </a>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">
                    <i className="fas fa-envelope me-1"></i>
                    البريد
                  </p>
                  <a
                    href={`mailto:${selected.email}`}
                    className="font-bold text-primary hover:underline text-sm break-all"
                  >
                    {selected.email}
                  </a>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">
                    <i className="fas fa-car me-1"></i>
                    التكوين
                  </p>
                  <p className="font-bold">{selected.formation}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">
                    <i className="fas fa-calendar me-1"></i>
                    الموعد
                  </p>
                  <p className="font-bold">
                    {formatDate(selected.date_rdv)} -{" "}
                    <span dir="ltr">{selected.heure}</span>
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">
                    <i className="fas fa-clock me-1"></i>
                    تاريخ الإرسال
                  </p>
                  <p className="font-bold text-sm">
                    {formatDateTime(selected.created_at ?? "")}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">الحالة</p>
                  <div>{badge(selected.statut)}</div>
                </div>
              </div>

              {selected.message && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                  <p className="text-xs text-yellow-700 mb-1">رسالة المترشح</p>
                  <p>{selected.message}</p>
                </div>
              )}

              <div>
                <label className="block mb-2 font-medium">
                  ملاحظاتك الخاصة (لن يراها المترشح)
                </label>
                <textarea
                  rows={3}
                  defaultValue={selected.notes_admin ?? ""}
                  onBlur={(e) => saveNotes(selected.id!, e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="مثال: تم الاتصال، يفضل الفترة الصباحية..."
                />
              </div>

              <div>
                <p className="block mb-2 font-medium">تغيير الحالة</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "nouveau", label: "جديد", cls: "bg-blue-500 hover:bg-blue-600" },
                    { key: "contacte", label: "تم الاتصال", cls: "bg-purple-500 hover:bg-purple-600" },
                    { key: "confirme", label: "تأكيد", cls: "bg-green-500 hover:bg-green-600" },
                    { key: "annule", label: "إلغاء", cls: "bg-red-500 hover:bg-red-600" },
                    { key: "termine", label: "إنهاء", cls: "bg-slate-500 hover:bg-slate-600" },
                  ].map((s) => (
                    <button
                      key={s.key}
                      onClick={() => updateStatut(selected.id!, s.key)}
                      className={`${s.cls} text-white px-4 py-2 rounded-full text-sm font-medium transition-colors`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                <a
                  href={`tel:${selected.telephone}`}
                  className="bg-primary text-white p-3 rounded-xl text-center font-medium hover:bg-primary-dark transition-colors"
                >
                  <i className="fas fa-phone me-2"></i>
                  اتصال
                </a>
                <a
                  href={`https://wa.me/${selected.telephone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-500 text-white p-3 rounded-xl text-center font-medium hover:bg-green-600 transition-colors"
                >
                  <i className="fab fa-whatsapp me-2"></i>
                  WhatsApp
                </a>
                <a
                  href={`mailto:${selected.email}`}
                  className="bg-slate-600 text-white p-3 rounded-xl text-center font-medium hover:bg-slate-700 transition-colors"
                >
                  <i className="fas fa-envelope me-2"></i>
                  إيميل
                </a>
              </div>

              <button
                onClick={() => deleteReservation(selected.id!)}
                className="w-full text-red-500 hover:bg-red-50 p-3 rounded-xl text-sm font-medium transition-colors"
              >
                <i className="fas fa-trash me-2"></i>
                حذف الطلب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
