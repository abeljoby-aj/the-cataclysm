import Navigation from "@/components/interface/Navigation";
import OpeningSequence from "@/components/sections/OpeningSequence";
import ChallengeDomains from "@/components/sections/ChallengeDomains";
import EventDetails from "@/components/sections/EventDetails";
import RegistrationSection from "@/components/sections/RegistrationSection";
import PrizePool from "@/components/sections/PrizePool";
import Schedule from "@/components/sections/Schedule";
import Venue from "@/components/sections/Venue";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#details">Skip to event information</a>
      <Navigation />
      <main id="main">
        <OpeningSequence />
        <ChallengeDomains />
        <PrizePool />
        <EventDetails />
        <Schedule />
        <RegistrationSection />
        <Venue />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
