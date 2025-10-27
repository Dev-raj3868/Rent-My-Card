import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <CreditCard className="h-6 w-6 text-primary" />
            CardRental
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/features") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Features
            </Link>
            <Link 
              to="/rental-plan" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/rental-plan") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Rental Plan
            </Link>
            <Link 
              to="/faq" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/faq") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              FAQ
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>
          </div>
          
          <Link to="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
