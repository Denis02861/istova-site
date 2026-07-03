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
import SmoothScroll from "./components/SmoothScroll";
import CookieBanner from "./components/CookieBanner";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Concept />
        <Ritual />
        <Reveal variant="up"><Quiz /></Reveal>
        <Reveal variant="up"><Programs /></Reveal>
        <Reveal variant="left"><TeaCard /></Reveal>
        <Reveal variant="scale"><Space /></Reveal>
        <Reveal variant="right"><Prep /></Reveal>
        <Reveal variant="fade"><Founder /></Reveal>
        <Reveal variant="up"><Certificates /></Reveal>
        <Reveal variant="up"><FAQ /></Reveal>
        <Reveal variant="left"><Contacts /></Reveal>
        <Reveal variant="scale"><Booking /></Reveal>
      </main>
      <Footer />
      <FloatingCTA />
      <StickyMobileBar />
      <ScrollProgress />
      <SmoothScroll />
      <CookieBanner />
    </>
  );
}
