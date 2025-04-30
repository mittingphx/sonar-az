import Hero from "@/components/home/Hero";
import FeaturedEvent from "@/components/home/FeaturedEvent";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import EventCalendar from "@/components/home/EventCalendar";
import About from "@/components/home/About";
import Newsletter from "@/components/home/Newsletter";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "SONAR AZ | Experimental Sound Events | Resonant Life Counseling";
  }, []);

  return (
    <>
      <Hero />
      <FeaturedEvent />
      <UpcomingEvents />
      <EventCalendar />
      <About />
      <Newsletter />
    </>
  );
};

export default Home;
