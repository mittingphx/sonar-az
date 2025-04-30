import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  DollarSign, 
  ArrowLeft, 
  ExternalLink, 
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Event, EventCategory, CATEGORY_COLORS } from "@/types";

const EventDetails = () => {
  const [match, params] = useRoute("/events/:id");
  const eventId = params?.id ? parseInt(params.id) : 0;

  const { data: event, isLoading, error } = useQuery<Event>({
    queryKey: [`/api/events/${eventId}`],
    enabled: !!eventId,
  });

  useEffect(() => {
    if (event) {
      document.title = `${event.title} | SONAR AZ`;
    } else {
      document.title = "Event Details | SONAR AZ";
    }
    window.scrollTo(0, 0);
  }, [event]);

  if (isLoading) {
    return (
      <div className="bg-darkgray py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Skeleton className="h-8 w-8 rounded-full mr-2 bg-purple/20" />
            <Skeleton className="h-6 w-24 bg-purple/20" />
          </div>
          
          <div className="bg-navy rounded-lg overflow-hidden">
            <Skeleton className="w-full h-64 md:h-96 bg-purple/20" />
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <Skeleton className="h-10 w-full max-w-md mb-3 bg-purple/20" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-24 rounded-full bg-purple/20" />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Skeleton className="h-10 w-36 rounded-full bg-purple/20" />
                  <Skeleton className="h-10 w-36 rounded-full bg-purple/20" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Skeleton className="h-16 w-full bg-purple/20 rounded-lg" />
                <Skeleton className="h-16 w-full bg-purple/20 rounded-lg" />
                <Skeleton className="h-16 w-full bg-purple/20 rounded-lg" />
              </div>
              
              <div className="space-y-4 mb-8">
                <Skeleton className="h-6 w-48 bg-purple/20" />
                <Skeleton className="h-40 w-full bg-purple/20" />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-24 rounded-full bg-purple/20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="bg-darkgray py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl mb-4">Event not found or an error occurred.</p>
          <Button asChild variant="outline">
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, "MMMM d, yyyy");
  const categoryColor = CATEGORY_COLORS[event.category as EventCategory];

  const handleShareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-darkgray py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center bg-transparent border-lightgray/30"
            asChild
          >
            <Link href="/events">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Events
            </Link>
          </Button>
        </div>
        
        <div className="bg-navy rounded-lg overflow-hidden">
          <div className="relative">
            <img 
              src={event.imageUrl || "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80"} 
              alt={event.title} 
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-4 right-4">
              <div className={`${categoryColor.bg} px-3 py-1 rounded-full text-sm font-medium ${categoryColor.text}`}>
                {event.category}
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">{event.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {event.tags?.map((tag, index) => (
                    <span key={index} className="bg-purple/30 text-lavender px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                {event.ticketUrl && (
                  <Button 
                    className="bg-teal hover:bg-pink text-white flex items-center"
                    size="lg"
                    asChild
                  >
                    <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                      Get Tickets
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-lightgray/50 hover:bg-purple/20"
                  onClick={handleShareEvent}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-darkgray rounded-lg p-4 flex items-center">
                <CalendarIcon className="h-6 w-6 text-teal mr-3" />
                <div>
                  <div className="text-sm text-lightgray/70">Date</div>
                  <div className="font-medium">{formattedDate}</div>
                </div>
              </div>
              
              <div className="bg-darkgray rounded-lg p-4 flex items-center">
                <Clock className="h-6 w-6 text-teal mr-3" />
                <div>
                  <div className="text-sm text-lightgray/70">Time</div>
                  <div className="font-medium">{event.time}</div>
                </div>
              </div>
              
              <div className="bg-darkgray rounded-lg p-4 flex items-center">
                {event.price ? (
                  <>
                    <DollarSign className="h-6 w-6 text-teal mr-3" />
                    <div>
                      <div className="text-sm text-lightgray/70">Price</div>
                      <div className="font-medium">{event.price}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <MapPin className="h-6 w-6 text-teal mr-3" />
                    <div>
                      <div className="text-sm text-lightgray/70">Location</div>
                      <div className="font-medium">{event.location}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-heading font-bold">About This Event</h2>
              <div className="prose prose-invert max-w-none">
                {event.description.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="bg-darkgray rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Venue Information</h2>
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 text-teal mr-2 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-medium">Resonant Life Counseling</div>
                  <div className="text-lightgray/70">{event.location}</div>
                </div>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425289.3942880693!2d-112.3235519!3d33.6054507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed50a179cb%3A0x8c69c7f8354a1bac!2sPhoenix%2C%20AZ!5e0!3m2!1sen!2sus!4v1618346407158!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy"
                  title="Event location map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
