import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import authBg from "@/assets/auth-bg.jpg";

type UserRole = "customer" | "card_holder";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>("customer");
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [googleRole, setGoogleRole] = useState<UserRole>("customer");
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  useEffect(() => {
    // Handle OAuth callback
    const handleOAuthCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (!roleData) {
          // New Google user - ask for role
          setPendingUserId(session.user.id);
          setShowRoleDialog(true);
        } else {
          // Existing user - redirect to dashboard
          toast.success("Signed in successfully!");
          navigate(roleData.role === "customer" ? "/customer-dashboard" : "/cardholder-dashboard");
        }
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("signup-email") as string;
    const password = formData.get("signup-password") as string;
    const fullName = formData.get("full-name") as string;
    const phone = formData.get("phone") as string;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, phone },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      if (data.user) {
        // Insert user role
        await supabase.from("user_roles").insert({ user_id: data.user.id, role });
        
        // Create profile with signup data
        await supabase.from("profiles").insert({
          id: data.user.id,
          full_name: fullName,
          phone: phone,
          email: email
        });
        
        toast.success("Account created successfully!");
        navigate(role === "customer" ? "/customer-dashboard" : "/cardholder-dashboard");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("signin-email") as string;
    const password = formData.get("signin-password") as string;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .maybeSingle();

      toast.success("Signed in successfully!");
      navigate(roleData?.role === "customer" ? "/customer-dashboard" : "/cardholder-dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleRoleSubmit = async () => {
    if (!pendingUserId) return;
    
    setLoading(true);
    try {
      await supabase.from("user_roles").insert({ 
        user_id: pendingUserId, 
        role: googleRole 
      });
      
      toast.success("Account setup complete!");
      setShowRoleDialog(false);
      navigate(googleRole === "customer" ? "/customer-dashboard" : "/cardholder-dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <img 
          src={authBg} 
          alt="Authentication background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85 backdrop-blur-sm"></div>
      </div>
      
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md hover-lift shadow-2xl backdrop-blur-md bg-card/90 border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome
          </CardTitle>
          <CardDescription className="text-base">
            Sign in or create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger value="signin" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input 
                    id="signin-email" 
                    name="signin-email" 
                    type="email" 
                    required 
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="signin-password" 
                      name="signin-password" 
                      type={showSignInPassword ? "text" : "password"} 
                      required 
                      className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-colors pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                    >
                      {showSignInPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    variant="link" 
                    className="px-0 text-sm" 
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot Password?
                  </Button>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input 
                    id="full-name" 
                    name="full-name" 
                    required 
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    required
                    placeholder="+91 XXXXX XXXXX" 
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input 
                    id="signup-email" 
                    name="signup-email" 
                    type="email" 
                    required 
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="signup-password" 
                      name="signup-password" 
                      type={showSignUpPassword ? "text" : "password"} 
                      required 
                      className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-colors pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    >
                      {showSignUpPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>I am a:</Label>
                  <RadioGroup value={role} onValueChange={(v) => setRole(v as UserRole)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="customer" id="customer" />
                      <Label htmlFor="customer" className="font-normal">Customer (Rent cards)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card_holder" id="card_holder" />
                      <Label htmlFor="card_holder" className="font-normal">Card Holder (Offer cards)</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      </div>

      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
            <DialogDescription>
              Please select your account type to continue
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <RadioGroup value={googleRole} onValueChange={(v) => setGoogleRole(v as UserRole)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="customer" id="google-customer" />
                <Label htmlFor="google-customer" className="font-normal">Customer (Rent cards)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card_holder" id="google-card_holder" />
                <Label htmlFor="google-card_holder" className="font-normal">Card Holder (Offer cards)</Label>
              </div>
            </RadioGroup>
            <Button onClick={handleRoleSubmit} className="w-full" disabled={loading}>
              {loading ? "Setting up..." : "Continue"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;