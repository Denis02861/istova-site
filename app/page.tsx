import Header from "./components/Header";
import Hero from "./components/Hero";
import Concept from "./components/Concept";
import Ritual from "./components/Ritual";
import Programs from "./components/Programs";
import TeaCard from "./components/TeaCard";
import Space from "./components/Space";
import Certificates from "./components/Certificates";
import FAQ from "./components/FAQ";
import Contacts from "./components/Contacts";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import FloatingCTA from "./components/FloatingCTA";
import Founder from "./components/Founder";
import Quiz from "./components/Quiz";
import Prep from "./components/Prep";
import StickyMobileBar from "./components/StickyMobileBar";
import ScrollProgress from "./components/ScrollProgress";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Reveal><Concept /></Reveal>
        <Reveal><Ritual /></Reveal>
        <Reveal><Quiz /></Reveal>
        <Reveal><Programs /></Reveal>
        <Reveal><TeaCard /></Reveal>
        <Reveal><Space /></Reveal>
        <Reveal><Prep /></Reveal>
        <Reveal><Founder /></Reveal>
        <Reveal><Certificates /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><Contacts /></Reveal>
        <Reveal><Booking /></Reveal>
      </main>
      <Footer />
      <FloatingCTA />
      <StickyMobileBar />
      <ScrollProgress />
    </>
  );
}
