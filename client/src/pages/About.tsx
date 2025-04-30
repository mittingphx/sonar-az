import { useEffect } from "react";
import About from "@/components/home/About";
import Newsletter from "@/components/home/Newsletter";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About | SONAR AZ";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">About SONAR AZ</h1>
          <p className="text-lg text-lightgray max-w-3xl">
            Exploring the intersections of experimental sound art and therapeutic practices.
          </p>
        </div>
      </div>
      
      <About />
      
      <div className="bg-darkgray py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-6">Our Story</h2>
            <div className="prose prose-invert">
              <p>
                SONAR AZ was founded in 2020 as a collaboration between local sound artists and the therapeutic team at Resonant Life Counseling. What began as a series of small experimental performances quickly grew into a unique platform that bridges the gap between therapeutic sound healing and avant-garde noise music.
              </p>
              
              <p>
                Our events take place in the intimate setting of Resonant Life Counseling's therapy space, transformed into a venue where boundaries between performer and audience blur, and where sound becomes both an artistic medium and a healing force.
              </p>
              
              <h3 className="text-xl font-heading font-bold mt-8 mb-4">What We Do</h3>
              
              <p>
                We curate and host a diverse range of sonic experiences:
              </p>
              
              <ul>
                <li>Experimental music performances</li>
                <li>Sound healing sessions</li>
                <li>Interactive installations</li>
                <li>Sound art workshops</li>
                <li>Collaborative sonic explorations</li>
              </ul>
              
              <p>
                Each event is designed to create space for deep listening, community connection, and the exploration of sound's transformative potential.
              </p>
              
              <h3 className="text-xl font-heading font-bold mt-8 mb-4">Our Team</h3>
              
              <p>
                SONAR AZ is organized by a small team of passionate sound artists, therapists, and community organizers who believe in the power of experimental sound to heal, transform, and connect.
              </p>
              
              <p>
                We collaborate with artists from across Arizona and beyond, creating a vibrant community around sound exploration and sonic healing practices.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Newsletter />
    </>
  );
};

export default AboutPage;
