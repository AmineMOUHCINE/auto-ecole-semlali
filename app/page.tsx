import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Horaires from "@/components/Horaires";
import Avantages from "@/components/Avantages";
import Formations from "@/components/Formations";
import Objectif from "@/components/Objectif";
import Temoignages from "@/components/Temoignages";
import ReservationForm from "@/components/ReservationForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Horaires />
        <Avantages />
        <Formations />
        <Objectif />
        <Temoignages />
        <ReservationForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
