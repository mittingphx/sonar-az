import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, getDate, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Event, EventCategory, CATEGORY_COLORS } from "@/types";
import CalendarDay from "@/components/events/CalendarDay";
import { Skeleton } from "@/components/ui/skeleton";

const EventCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data: events = [], isLoading, error } = useQuery<Event[]>({
    queryKey: ['/api/events/upcoming'],
  });

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Generate calendar days for the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Function to check if a date has events
  const hasEvents = (date: Date) => {
    return events?.some(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  // Get events for a date
  const getEventsForDate = (date: Date) => {
    return events?.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    }) || [];
  };

  // Get events for the current month
  const getEventsForCurrentMonth = () => {
    return events?.filter(event => {
      const eventDate = new Date(event.date);
      return isSameMonth(eventDate, currentMonth);
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [];
  };

  // Get day names for the calendar header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthEvents = getEventsForCurrentMonth();

  if (isLoading) {
    return (
      <section id="calendar" className="bg-navy py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-48 mb-8 bg-purple/20" />
          
          <div className="bg-darkgray p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-7 w-32 bg-purple/20" />
              <div className="flex space-x-2">
                <Skeleton className="h-9 w-9 rounded-full bg-purple/20" />
                <Skeleton className="h-9 w-9 rounded-full bg-purple/20" />
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {dayNames.map(day => (
                <Skeleton key={day} className="h-6 w-full bg-purple/20" />
              ))}
              
              {Array.from({ length: 35 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full bg-purple/20" />
              ))}
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-24 bg-purple/20" />
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <Skeleton className="h-7 w-40 mb-4 bg-purple/20" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg bg-purple/20" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  return (
    <section id="calendar" className="bg-navy py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold mb-8">Event Calendar</h2>
        
        <div className="bg-darkgray p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-heading">{format(currentMonth, "MMMM yyyy")}</h3>
            <div className="flex space-x-2">
              <button 
                className="p-2 hover:bg-purple/20 rounded-full transition-colors"
                onClick={prevMonth}
                aria-label="Previous month"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                className="p-2 hover:bg-purple/20 rounded-full transition-colors"
                onClick={nextMonth}
                aria-label="Next month"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Days header */}
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm text-lightgray/60 font-medium">{day}</div>
            ))}
            
            {/* Previous month days for padding */}
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`prev-${index}`} className="text-center py-2 text-lightgray/40">
                {getDate(subMonths(monthEnd, 1).setDate(endOfMonth(subMonths(monthStart, 1)).getDate() - monthStart.getDay() + index + 1))}
              </div>
            ))}
            
            {/* Current month days */}
            {calendarDays.map(day => (
              <CalendarDay 
                key={day.toISOString()} 
                day={day}
                hasEvent={hasEvents(day)}
                events={getEventsForDate(day)}
              />
            ))}
            
            {/* Next month days for padding */}
            {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
              <div key={`next-${index}`} className="text-center py-2 text-lightgray/40">
                {index + 1}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4">
            {Object.entries(CATEGORY_COLORS).map(([category, colors]) => (
              <div key={category} className="flex items-center">
                <span className={`w-3 h-3 rounded-full ${colors.bg} mr-2`}></span>
                <span className="text-sm">{category}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming from calendar */}
        {monthEvents.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-heading mb-4">Upcoming in {format(currentMonth, "MMMM")}</h3>
            <div className="space-y-3">
              {monthEvents.slice(0, 3).map(event => {
                const eventDate = new Date(event.date);
                const categoryColor = CATEGORY_COLORS[event.category as EventCategory];
                
                return (
                  <Link 
                    key={event.id} 
                    href={`/events/${event.id}`}
                    className="flex items-center bg-navy/50 p-3 rounded-lg hover:bg-purple/20 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-darkgray flex items-center justify-center text-center mr-4 flex-shrink-0">
                      <span className="block font-heading text-lg leading-none font-bold">{format(eventDate, "dd")}</span>
                      <span className="text-[10px] uppercase">{format(eventDate, "MMM")}</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-heading text-lg">{event.title}</h4>
                      <div className="flex items-center text-sm text-lightgray/80">
                        <span className="flex items-center">
                          <Clock className={`h-3 w-3 mr-1 ${categoryColor.bg}`} />
                          {event.time}
                        </span>
                        <span className="mx-2">•</span>
                        <span className={`bg-${categoryColor.bg}/20 ${categoryColor.text} px-2 py-0.5 rounded text-xs`}>
                          {event.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-lightgray/60" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventCalendar;
