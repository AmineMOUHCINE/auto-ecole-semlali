"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/types";

const testimonials: Testimonial[] = [
  { text: "أفضل مؤسسة تعلمت فيها السياقة، مدربون محترفون وحصص مرنة.", author: "- محمد، صنف B" },
  { text: "بفضلكم حصلت على الرخصة من أول مرة، شكرا لفريق السملالي!", author: "- فاطمة، صنف A" },
  { text: "تكوين شامل ونظري قوي، ننصح به بشدة.", author: "- ياسين، صنف C" },
  { text: "مدربون صبورون وأساليب تعليم حديثة، تجربة رائعة.", author: "- سارة، صنف D" },
  { text: "موقع مناسب ومواعيد مرنة، حققت هدفي بسرعة.", author: "- كمال، صنف EC" },
];

export default function Temoignages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section className="px-[5%] py-16">
      <h2 className="section-title">
        <i className="fas fa-star me-2"></i>
        آراء المتدربين
      </h2>
      <div className="bg-primary text-white p-8 rounded-3xl text-center max-w-2xl mx-auto">
        <div className="text-accent text-2xl">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
        <p key={index} className="text-xl my-4 animate-fadeIn">
          "{current.text}"
        </p>
        <h4 className="font-bold">{current.author}</h4>
      </div>
    </section>
  );
}
