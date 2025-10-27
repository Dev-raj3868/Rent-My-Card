import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreditCard, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/features", label: "Features" },
    { path: "/rental-plan", label: "Rental Plan" },
    { path: "/faq", label: "FAQ" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];
  
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <CreditCard className="h-6 w-6 text-primary" />
            CardRental
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-sm font-medium transition-all duration-200 relative group ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/cardholder-auth">
              <Button variant="outline" className="hover-scale">
                Join as Cardholder
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="hover-scale">Get Started</Button>
            </Link>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover-scale">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium transition-colors hover:text-primary ${
                      isActive(link.path) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-6 space-y-3">
                  <Link to="/cardholder-auth" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Join as Cardholder
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
