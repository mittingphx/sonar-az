import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { Event } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedEvent = () => {
  const { data: event, isLoading, error } = useQuery<Event>({
    queryKey: ['/api/events/featured'],
  });

  if (isLoading) {
    return (
      <section className="bg-navy py-16 relative overflow-hidden wave-bg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <Skeleton className="h-6 w-24 mb-4 bg-purple/30" />
              <Skeleton className="h-10 w-full max-w-md mb-4 bg-purple/30" />
              <div className="flex items-center space-x-4 mb-4">
                <Skeleton className="h-6 w-32 bg-purple/30" />
                <Skeleton className="h-6 w-24 bg-purple/30" />
              </div>
              <Skeleton className="h-24 w-full mb-6 bg-purple/30" />
              <div className="flex flex-wrap gap-2 mb-6">
                <Skeleton className="h-6 w-24 bg-purple/30 rounded-full" />
                <Skeleton className="h-6 w-32 bg-purple/30 rounded-full" />
                <Skeleton className="h-6 w-28 bg-purple/30 rounded-full" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Skeleton className="h-10 w-32 bg-purple/30 rounded-full" />
                <Skeleton className="h-10 w-32 bg-purple/30 rounded-full" />
              </div>
            </div>
            <div className="md:w-1/2">
              <Skeleton className="w-full h-64 rounded-lg bg-purple/30" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !event) {
    return null;
  }

  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, "MMMM d, yyyy");

  return (
    <section className="bg-navy py-16 relative overflow-hidden wave-bg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <span className="inline-block bg-pink/20 text-pink px-3 py-1 rounded-full text-sm font-medium mb-4">
              FEATURED EVENT
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{event.title}</h2>
            <div className="flex items-center space-x-4 mb-4 font-mono text-sm">
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1 text-teal" />
                {formattedDate}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-teal" />
                {event.time}
              </span>
            </div>
            <p className="text-lg mb-6">
              {event.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags?.map((tag, index) => (
                <span key={index} className="bg-purple/30 text-lavender px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {event.ticketUrl && (
                <Button 
                  asChild 
                  className="bg-teal hover:bg-pink text-white"
                >
                  <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                    Get Tickets
                  </a>
                </Button>
              )}
              <Button 
                asChild 
                variant="outline" 
                className="bg-transparent hover:bg-darkgray text-lightgray border-lightgray"
              >
                <Link href={`/events/${event.id}`}>
                  Event Details
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src={event.imageUrl || "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80"}
                alt={event.title} 
                className="w-full h-auto rounded-lg object-cover aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-pink animate-pulse"></div>
                  <span className="text-white font-medium">Limited Capacity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;
