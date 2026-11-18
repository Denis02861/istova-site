import Header from "./components/Header";
import Hero from "./components/Hero";
import Concept from "./components/Concept";
import Founder from "./components/Founder";
import HeadSpa from "./components/HeadSpa";
import Ritual from "./components/Ritual";
import Programs from "./components/Programs";
import Teplota from "./components/Teplota";
import TeaCard from "./components/TeaCard";
import Space from "./components/Space";
import Gallery from "./components/Gallery";
import Certificates from "./components/Certificates";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";
import Contacts from "./components/Contacts";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import FloatingCTA from "./components/FloatingCTA";
import Quiz from "./components/Quiz";
import StickyMobileBar from "./components/StickyMobileBar";
import CertificateOrder from "./components/CertificateOrder";
import ScrollProgress from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Concept />
        <HeadSpa />
        <Ritual />
        <Reveal variant="up"><Quiz /></Reveal>
        <Reveal variant="up"><Programs /></Reveal>
        <Reveal variant="up"><Teplota /></Reveal>
        <TeaCard />
        <Reveal variant="up"><Space /></Reveal>
        <Reveal variant="up"><Gallery /></Reveal>
        <Reveal variant="up"><Certificates /></Reveal>
        <Reveal variant="up"><FAQ /></Reveal>
        <Reveal variant="up"><Reviews /></Reveal>
        {/* Слово основателя — внизу, перед контактами и записью, компактно (Денис 18.11.2026):
            наверху мешал, спа для головы цепляет сильнее и поднят сразу после концепции. */}
        <Reveal variant="up"><Founder /></Reveal>
        <Reveal variant="up"><Contacts /></Reveal>
        <Reveal variant="up"><Booking /></Reveal>
      </main>
      <CertificateOrder />
      <Footer />
      <FloatingCTA />
      <StickyMobileBar />
      <ScrollProgress />
      <SmoothScroll />
    </>
  );
}
