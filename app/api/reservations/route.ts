import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, telephone, email, formation, date_rdv, heure, message } = body;

    if (!nom || !telephone || !email || !date_rdv) {
      return NextResponse.json(
        { error: "الرجاء تعبئة جميع الحقول الإلزامية." },
        { status: 400 }
      );
    }

    // Client b service_role key (bla RLS, bla session)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { error } = await supabaseAdmin.from("reservations").insert([
      {
        nom,
        telephone,
        email,
        formation,
        date_rdv,
        heure,
        message: message || null,
        statut: "nouveau",
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "خطأ في الخادم." }, { status: 500 });
  }
}