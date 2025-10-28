import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

type UserRole = "customer" | "card_holder";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>("customer");
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [googleRole, setGoogleRole] = useState<UserRole>("customer");
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);

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
        await supabase.from("user_roles").insert({ user_id: data.user.id, role });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>Sign in or create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input id="signin-email" name="signin-email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input id="signin-password" name="signin-password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="relative my-4">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  OR
                </span>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={handleGoogleSignIn}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </Button>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" name="full-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" name="signup-email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" name="signup-password" type="password" required />
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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