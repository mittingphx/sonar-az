import { Link } from "wouter";
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <img 
                src="https://resonantlifecounseling.com/wp-content/uploads/2020/09/rlc-logo-transparent.png" 
                alt="Resonant Life Counseling Logo" 
                className="h-10 mr-3"
              />
              <div>
                <div className="text-pink font-heading font-bold text-xl">SONAR AZ</div>
                <div className="text-teal text-xs tracking-wider">EXPERIMENTAL SOUND EVENTS</div>
              </div>
            </div>
            <p className="text-lightgray/70 max-w-md mb-4">
              An experimental sound event series hosted at Resonant Life Counseling, exploring the intersection of noise music and sound healing.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lightgray hover:text-pink transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lightgray hover:text-pink transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lightgray hover:text-pink transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Events</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/events" className="text-lightgray/70 hover:text-pink transition-colors">
                    Upcoming
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-lightgray/70 hover:text-pink transition-colors">
                    Past Events
                  </Link>
                </li>
                <li>
                  <Link href="/calendar" className="text-lightgray/70 hover:text-pink transition-colors">
                    Calendar
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-lightgray/70 hover:text-pink transition-colors">
                    Tickets
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-lightgray/70 hover:text-pink transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-lightgray/70 hover:text-pink transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://resonantlifecounseling.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lightgray/70 hover:text-pink transition-colors"
                  >
                    RLC Therapy
                  </a>
                </li>
                <li>
                  <Link href="/about" className="text-lightgray/70 hover:text-pink transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-teal flex-shrink-0" />
                  <span className="text-lightgray/70">Phoenix, AZ - Resonant Life Counseling</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 text-teal flex-shrink-0" />
                  <span className="text-lightgray/70">contact@sonaraz.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 text-teal flex-shrink-0" />
                  <span className="text-lightgray/70">(602) 555-1234</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-lightgray/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-lightgray/60">
            &copy; {new Date().getFullYear()} SONAR AZ at Resonant Life Counseling. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-lightgray/60 hover:text-pink transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-lightgray/60 hover:text-pink transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-sm text-lightgray/60 hover:text-pink transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
