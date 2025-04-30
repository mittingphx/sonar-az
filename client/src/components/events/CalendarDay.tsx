import { useState } from "react";
import { format } from "date-fns";
import { Event, EventCategory, CATEGORY_COLORS } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { Link } from "wouter";

interface CalendarDayProps {
  day: Date;
  hasEvent: boolean;
  events: Event[];
}

const CalendarDay = ({ day, hasEvent, events }: CalendarDayProps) => {
  const dayNum = format(day, "d");
  const eventsByCategory = events.reduce<Record<EventCategory, Event[]>>((acc, event) => {
    const category = event.category as EventCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(event);
    return acc;
  }, {} as Record<EventCategory, Event[]>);

  // Determine style based on events
  let dayStyle = "text-center py-2";
  let categoryBg = "";
  
  if (hasEvent) {
    if (events.length === 1) {
      const category = events[0].category as EventCategory;
      const categoryColor = CATEGORY_COLORS[category];
      categoryBg = `${categoryColor.bg}/20`;
      dayStyle += ` rounded-full bg-${categoryBg} ${categoryColor.text} relative calendar-day has-event`;
    } else {
      dayStyle += " relative calendar-day has-event";
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={dayStyle}>
          {dayNum}
        </button>
      </PopoverTrigger>
      
      {hasEvent && (
        <PopoverContent className="w-80 p-0 bg-darkgray border-purple">
          <div className="p-4">
            <div className="flex items-center mb-2">
              <CalendarIcon className="mr-2 h-4 w-4 text-teal" />
              <span className="font-heading">{format(day, "MMMM d, yyyy")}</span>
            </div>
            
            <div className="space-y-3 mt-3">
              {Object.entries(eventsByCategory).map(([category, categoryEvents]) => (
                <div key={category}>
                  <h4 className={`text-sm font-medium ${CATEGORY_COLORS[category as EventCategory].text} mb-1`}>
                    {category}
                  </h4>
                  
                  {categoryEvents.map(event => (
                    <Link 
                      key={event.id}
                      href={`/events/${event.id}`}
                      className="block p-2 hover:bg-navy/50 rounded-md transition-colors"
                    >
                      <div className="font-heading text-sm font-medium">{event.title}</div>
                      <div className="flex items-center text-xs text-lightgray/70 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{event.time}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default CalendarDay;
