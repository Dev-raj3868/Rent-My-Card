import { Link } from "react-router-dom";
import { CreditCard, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl hover-scale">
              <CreditCard className="h-6 w-6 text-primary" />
              CardRental
            </Link>
            <p className="text-sm text-gray-400">
              Your trusted marketplace for credit card rental services with exclusive discounts.
            </p>
            <div className="flex gap-3 pt-4">
              <Button size="icon" variant="outline" className="rounded-full hover-scale hover-glow bg-white/10 border-white/20 hover:bg-primary hover:border-primary transition-all">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full hover-scale hover-glow bg-white/10 border-white/20 hover:bg-primary hover:border-primary transition-all">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full hover-scale hover-glow bg-white/10 border-white/20 hover:bg-primary hover:border-primary transition-all">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full hover-scale hover-glow bg-white/10 border-white/20 hover:bg-primary hover:border-primary transition-all">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/features" className="text-gray-400 hover:text-primary transition-colors hover-scale inline-block">Features</Link></li>
              <li><Link to="/rental-plan" className="text-gray-400 hover:text-primary transition-colors hover-scale inline-block">Rental Plans</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-primary transition-colors hover-scale inline-block">FAQ</Link></li>
              <li><Link to="/featured-cards" className="text-gray-400 hover:text-primary transition-colors hover-scale inline-block">Featured Cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors hover-scale inline-block">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors hover-scale inline-block">Contact</Link></li>
              <li className="flex items-center gap-2 text-gray-400"><Mail className="h-4 w-4" /> support@cardrental.com</li>
              <li className="flex items-center gap-2 text-gray-400"><Phone className="h-4 w-4" /> +1 (555) 123-4567</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Legal & Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors hover-scale inline-block">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors hover-scale inline-block">Terms of Service</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors hover-scale inline-block">Refund Policy</Link></li>
              <li className="flex items-center gap-2 text-gray-400"><MapPin className="h-4 w-4" /> San Francisco, CA</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} CardRental. All rights reserved.</p>
            <div className="flex gap-6 text-xs">
              <Link to="/" className="hover:text-primary transition-colors hover-scale">Sitemap</Link>
              <Link to="/" className="hover:text-primary transition-colors hover-scale">Accessibility</Link>
              <Link to="/" className="hover:text-primary transition-colors hover-scale">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
