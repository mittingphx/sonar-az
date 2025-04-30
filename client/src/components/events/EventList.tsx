import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Event, EventCategory } from "@/types";
import EventCard from "./EventCard";
import { Skeleton } from "@/components/ui/skeleton";

const EventList = () => {
  const [activeCategory, setActiveCategory] = useState<EventCategory | "All">("All");
  
  const { data: events = [], isLoading, error } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const filteredEvents = activeCategory === "All" 
    ? events 
    : events.filter(event => event.category === activeCategory);

  const handleCategoryChange = (category: EventCategory | "All") => {
    setActiveCategory(category);
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-end mb-8">
          <div>
            <Skeleton className="h-8 w-40 mb-2 bg-purple/20" />
            <Skeleton className="h-5 w-60 bg-purple/20" />
          </div>
          <div className="hidden md:flex space-x-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full bg-purple/20" />
            ))}
          </div>
        </div>
        
        <div className="flex md:hidden space-x-2 mb-6 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full bg-purple/20" />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-navy rounded-lg overflow-hidden">
              <Skeleton className="w-full h-48 bg-purple/20" />
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <Skeleton className="h-14 w-14 rounded-lg bg-purple/20" />
                  <Skeleton className="h-6 w-20 bg-purple/20" />
                </div>
                <Skeleton className="h-7 w-full mb-2 bg-purple/20" />
                <Skeleton className="h-16 w-full mb-4 bg-purple/20" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-16 bg-purple/20" />
                  <Skeleton className="h-6 w-24 bg-purple/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10">Failed to load events. Please try again later.</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-heading font-bold mb-2">All Events</h2>
          <p className="text-lightgray/80">Browse our complete schedule of sonic experiences</p>
        </div>
        <div className="hidden md:flex space-x-2">
          <button 
            className={`border border-lightgray/30 text-lightgray px-3 py-1 rounded-full transition-colors text-sm ${
              activeCategory === "All" ? "bg-purple border-purple" : "hover:bg-purple hover:border-purple"
            }`}
            onClick={() => handleCategoryChange("All")}
          >
            All
          </button>
          {Object.values(EventCategory).map(category => (
            <button 
              key={category}
              className={`border border-lightgray/30 text-lightgray px-3 py-1 rounded-full transition-colors text-sm ${
                activeCategory === category ? "bg-purple border-purple" : "hover:bg-purple hover:border-purple"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile filters */}
      <div className="flex md:hidden space-x-2 mb-6 overflow-x-auto pb-2">
        <button 
          className={`border border-lightgray/30 text-lightgray px-3 py-1 rounded-full transition-colors text-sm whitespace-nowrap ${
            activeCategory === "All" ? "bg-purple border-purple" : "hover:bg-purple hover:border-purple"
          }`}
          onClick={() => handleCategoryChange("All")}
        >
          All
        </button>
        {Object.values(EventCategory).map(category => (
          <button 
            key={category}
            className={`border border-lightgray/30 text-lightgray px-3 py-1 rounded-full transition-colors text-sm whitespace-nowrap ${
              activeCategory === category ? "bg-purple border-purple" : "hover:bg-purple hover:border-purple"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {filteredEvents.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl">No events found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
