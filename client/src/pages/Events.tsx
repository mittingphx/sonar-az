import { useEffect } from "react";
import EventList from "@/components/events/EventList";

const Events = () => {
  useEffect(() => {
    document.title = "Events | SONAR AZ";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-darkgray py-16">
      <div className="container mx-auto px-4">
        <EventList />
      </div>
    </div>
  );
};

export default Events;
