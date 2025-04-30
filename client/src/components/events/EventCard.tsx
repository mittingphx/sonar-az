import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Event, EventCategory, CATEGORY_COLORS } from "@/types";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const eventDate = new Date(event.date);
  const day = format(eventDate, "dd");
  const month = format(eventDate, "MMM");
  const categoryColor = CATEGORY_COLORS[event.category as EventCategory];

  return (
    <div className="bg-navy rounded-lg overflow-hidden transition-transform hover:scale-[1.02] group">
      <div className="relative">
        <img 
          src={event.imageUrl || `https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80`}
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-0 right-0 ${categoryColor.bg} m-3 px-2 py-1 rounded text-xs font-medium ${categoryColor.text}`}>
          {event.category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="bg-darkgray rounded-lg px-3 py-2 text-center">
            <span className="block font-heading text-xl font-bold">{day}</span>
            <span className="text-xs uppercase">{month}</span>
          </div>
          <div className="font-mono text-sm text-lightgray/80">{event.time}</div>
        </div>
        <h3 className="font-heading text-xl font-medium mb-2 group-hover:text-pink transition-colors">
          {event.title}
        </h3>
        <p className="text-lightgray/70 text-sm mb-4 line-clamp-3">
          {event.shortDescription}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {event.tags?.slice(0, 3).map((_, index) => (
              <span key={index} className={`inline-block w-2 h-2 rounded-full ${
                index === 0 ? "bg-teal" : index === 1 ? "bg-lavender" : "bg-pink"
              }`}></span>
            ))}
          </div>
          <Link 
            href={`/events/${event.id}`}
            className="text-teal hover:text-pink transition-colors text-sm font-medium flex items-center"
          >
            Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
