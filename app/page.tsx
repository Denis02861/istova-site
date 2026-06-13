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

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Concept />
        <Ritual />
        <Programs />
        <TeaCard />
        <Space />
        <Certificates />
        <FAQ />
        <Contacts />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
