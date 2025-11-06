import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const whatsappNumber = "916396038900";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We'd love to hear from you
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" rows={5} required />
                  </div>
                  <Button type="submit" className="w-full hover-scale">Send Message</Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">support@cardrental.com</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+91 6396038900</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.25s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">Chat with us on WhatsApp</p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I have a question about RentMyCard.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#20BA5A]">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Start Chat
                    </Button>
                  </a>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    123 Business Street<br />
                    Suite 456<br />
                    San Francisco, CA 94103
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Contact;
