import { Link } from "wouter";
import { ExternalLink } from "lucide-react";

const About = () => {
  return (
    <section className="bg-darkgray py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-heading font-bold mb-4">About SONAR AZ</h2>
            <p className="text-lg mb-6">
              SONAR AZ is an experimental sound event series hosted at Resonant Life Counseling, bridging the gap between artistic noise music and therapeutic sound healing.
            </p>
            <p className="mb-6">
              Our events bring together artists, therapists, and audiences to explore the transformative power of sound. From immersive performances to hands-on workshops, we create spaces where experimental art and healing practices converge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="border-l-4 border-teal pl-4">
                <h3 className="font-heading text-lg mb-1">Our Mission</h3>
                <p className="text-lightgray/80 text-sm">
                  To create accessible sonic experiences that challenge, heal, and connect our community through experimental sound.
                </p>
              </div>
              <div className="border-l-4 border-pink pl-4">
                <h3 className="font-heading text-lg mb-1">Our Vision</h3>
                <p className="text-lightgray/80 text-sm">
                  A world where sound's therapeutic and artistic potential is fully explored and shared.
                </p>
              </div>
            </div>
            <a 
              href="https://resonantlifecounseling.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal hover:text-pink transition-colors flex items-center"
            >
              Learn more about Resonant Life Counseling
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80" 
                alt="Sound healing session with crystal bowls" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=600&q=80" 
                alt="Experimental music performance" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80" 
                alt="Audio-visual installation" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80" 
                alt="Music performance art" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
