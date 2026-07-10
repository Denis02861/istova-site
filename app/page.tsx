import Header from "./components/Header";
import Hero from "./components/Hero";
import Concept from "./components/Concept";
import Services from "./components/Services";
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
import Quiz from "./components/Quiz";
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
        <Reveal variant="up"><Services /></Reveal>
        <Ritual />
        <Reveal variant="up"><Quiz /></Reveal>
        <Reveal variant="up"><Programs /></Reveal>
        <TeaCard />
        <Reveal variant="up"><Space /></Reveal>
        <Reveal variant="up"><Certificates /></Reveal>
        <Reveal variant="up"><FAQ /></Reveal>
        <Reveal variant="up"><Contacts /></Reveal>
        <Reveal variant="up"><Booking /></Reveal>
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
