"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gradient-to-br from-primary-dark to-primary text-white px-[5%] py-4 sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <i className="fas fa-car text-3xl text-accent"></i>
          <div>
            <h1 className="text-2xl font-extrabold">مؤسسة السملالي</h1>
            <p className="text-sm text-accent">لتعليم السياقة وقانون السير</p>
          </div>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${open ? "fa-times" : "fa-bars"}`}></i>
        </button>

        <ul
          className={`${
            open ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-6 list-none items-center w-full md:w-auto`}
        >
          <li>
            <a href="#accueil" className="hover:text-accent transition-colors font-medium">
              الرئيسية
            </a>
          </li>
          <li>
            <a href="#formations" className="hover:text-accent transition-colors font-medium">
              التكوينات
            </a>
          </li>
          <li>
            <a href="#reservation" className="btn-reserve">
              <i className="fas fa-calendar-check me-2"></i>
              حجز موعد
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-accent transition-colors font-medium">
              اتصل بنا
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
