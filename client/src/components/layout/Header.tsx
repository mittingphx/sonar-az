import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import SonarLogo from "@/assets/logo.svg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-navy shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <img 
            src={SonarLogo} 
            alt="SONAR AZ Logo" 
            className="h-12"
          />
          <div className="flex flex-col">
            <span className="text-pink font-heading font-bold text-2xl leading-tight">SONAR AZ</span>
            <span className="text-teal text-xs tracking-wider">EXPERIMENTAL SOUND EVENTS</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/events" className={`${isActive('/events') ? 'text-pink' : 'text-lightgray hover:text-pink'} transition-colors`}>
            Events
          </Link>
          <Link href="/calendar" className={`${isActive('/calendar') ? 'text-pink' : 'text-lightgray hover:text-pink'} transition-colors`}>
            Calendar
          </Link>
          <Link href="/about" className={`${isActive('/about') ? 'text-pink' : 'text-lightgray hover:text-pink'} transition-colors`}>
            About
          </Link>
          <a 
            href="https://resonantlifecounseling.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-lightgray hover:text-pink transition-colors"
          >
            RLC Main Site
          </a>
          <Button 
            asChild 
            className="bg-purple hover:bg-pink text-white transition-colors"
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>
        
        <button 
          className="md:hidden text-lightgray" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-darkgray">
          <nav className="flex flex-col space-y-3 py-3">
            <Link 
              href="/events" 
              className={`${isActive('/events') ? 'text-pink' : 'text-lightgray hover:text-pink'} transition-colors`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              href="/calendar" 
              className={`${isActive('/calendar') ? 'text-pink' : 'text-lightgray hover:text-pink'} transition-colors`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calendar
            </Link>
            <Link 
              href="/about" 
              className={`${isActive('/about') ? 'text-pink' : 'text-lightgray hover:text-pink'} transition-colors`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <a 
              href="https://resonantlifecounseling.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lightgray hover:text-pink transition-colors"
            >
              RLC Main Site
            </a>
            <Button 
              asChild 
              className="bg-purple hover:bg-pink text-white transition-colors w-max"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/contact">Contact</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
