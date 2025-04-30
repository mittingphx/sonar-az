import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Event, CalendarEvent } from "@/types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

const Calendar = () => {
  const [_, setLocation] = useLocation();

  const { data: events = [], isLoading, error } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  useEffect(() => {
    document.title = "Event Calendar | SONAR AZ";
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-darkgray py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-48 mb-6 bg-purple/20" />
          <Skeleton className="h-[600px] w-full rounded-lg bg-purple/10" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-darkgray py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-heading font-bold mb-6">Event Calendar</h1>
          <p className="text-xl mb-4">Failed to load calendar data. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Map events to FullCalendar format
  const calendarEvents = events.map(event => ({
    id: String(event.id),
    title: event.title,
    start: new Date(event.date),
    allDay: false,
    extendedProps: {
      ...event,
      category: event.category,
      time: event.time
    },
    backgroundColor: event.category === "Performance" 
      ? "#FF1F8F" 
      : event.category === "Healing" 
        ? "#ADA1D9" 
        : "#00B2A9",
    borderColor: "transparent"
  }));

  const handleEventClick = (info: any) => {
    const eventId = info.event.id;
    setLocation(`/events/${eventId}`);
  };

  return (
    <div className="bg-darkgray py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-heading font-bold mb-6">Event Calendar</h1>
        
        <div className="bg-navy p-6 rounded-lg">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            eventClick={handleEventClick}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek'
            }}
            height="auto"
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: 'short'
            }}
            themeSystem="standard"
            dayMaxEvents={true}
            eventDisplay="block"
            eventDidMount={(info) => {
              // Add custom tooltip
              const eventTitle = info.event.title;
              const eventTime = info.event.extendedProps.time;
              const eventCategory = info.event.extendedProps.category;
              
              info.el.setAttribute('title', `${eventTitle} - ${eventTime} - ${eventCategory}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
