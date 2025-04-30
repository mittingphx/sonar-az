import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Hero = () => {
  // Function to randomize sound bars
  const randomizeBars = () => {
    const soundBars = document.querySelectorAll('.sound-bar');
    
    soundBars.forEach(bar => {
      const randomDelay = Math.random() * 1;
      const randomDuration = 1 + Math.random() * 2;
      (bar as HTMLElement).style.animationDelay = `${randomDelay}s`;
      (bar as HTMLElement).style.animationDuration = `${randomDuration}s`;
    });
  };

  useEffect(() => {
    // Initialize and occasionally randomize
    randomizeBars();
    const interval = setInterval(randomizeBars, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-darkgray">
      <div className="absolute inset-0 opacity-30">
        <div className="flex justify-between h-full">
          {/* Sound bars animation */}
          {Array.from({ length: 20 }).map((_, index) => (
            <div 
              key={index}
              className="sound-bar bg-purple w-1 h-full opacity-60" 
              style={{ 
                animationDelay: `${Math.random() * 0.8}s`,
                opacity: 0.4 + Math.random() * 0.4 
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-white">
            Experience <span className="text-pink">Sound</span> in <span className="text-teal">New Dimensions</span>
          </h1>
          <p className="text-xl mb-8 text-lightgray max-w-2xl">
            SONAR AZ presents experimental noise music and sonic healing events. Join us at the intersection of therapeutic sound and avant-garde performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-purple hover:bg-pink text-white">
              <Link href="#upcoming">Upcoming Events</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-teal text-white hover:bg-teal">
              <Link href="#calendar">View Calendar</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
