import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { LinkedinIcon, PhoneIcon, MailIcon, AlertCircleIcon, UserRoundIcon, BuildingIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import { Link } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const {
    login,
    loginWithLinkedIn,
    loginWithPhone,
    sendPhoneCode,
    loading,
    error
  } = useAuth();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [showTestCredentials, setShowTestCredentials] = useState(false);
  const [activeTab, setActiveTab] = useState("student");
  const [showRegister, setShowRegister] = useState(false);
  const testCredentials = {
    email: "test@collegenet.com",
    password: "Test@123"
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({
      email,
      password
    });
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
      await sendPhoneCode(formattedPhone);
      setCodeSent(true);
    } catch (error) {
      console.error("Failed to send code", error);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithPhone(phone, verificationCode);
    } catch (error) {
      console.error("Phone verification failed", error);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^\d+]/g, '').replace(/([+])([+])/g, '$1');
    setPhone(cleanedValue);
  };

  const useTestCredentials = () => {
    setEmail(testCredentials.email);
    setPassword(testCredentials.password);
  };

  return <>
      <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700 shadow-lg">
        <CardHeader className="relative">
          <div className="absolute right-4 top-4">
            
          </div>
          <Tabs defaultValue="student" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-2 dark:bg-gray-700">
              <TabsTrigger value="student" className="dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white dark:text-gray-200">
                <UserRoundIcon className="h-4 w-4 mr-2" />
                Student
              </TabsTrigger>
              <TabsTrigger value="organizer" className="dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white dark:text-gray-200">
                <BuildingIcon className="h-4 w-4 mr-2" />
                Organizer
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <CardTitle className="text-2xl font-bold dark:text-white">Welcome to CollegeNet</CardTitle>
              <CardDescription className="dark:text-gray-300">Sign in as a student</CardDescription>

              {error && <Alert variant="destructive" className="mb-4">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>}
              
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-3 dark:bg-gray-700">
                  <TabsTrigger value="email" className="dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white dark:text-gray-200">Email</TabsTrigger>
                  <TabsTrigger value="phone" className="dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white dark:text-gray-200">Phone</TabsTrigger>
                  <TabsTrigger value="linkedin" className="dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white dark:text-gray-200">LinkedIn</TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <form onSubmit={handleEmailLogin} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="you@example.com" className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" value={email} onChange={e => setEmail(e.target.value)} required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
                      <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" required />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button type="submit" className="w-3/4" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                      </Button>
                      <Toggle aria-label="Toggle test credentials" className="border dark:border-gray-600" pressed={showTestCredentials} onPressedChange={setShowTestCredentials}>
                        Test
                      </Toggle>
                    </div>

                    {showTestCredentials && <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                        <p className="text-sm dark:text-gray-300 mb-1">Test Credentials:</p>
                        <p className="text-xs dark:text-gray-400">Email: {testCredentials.email}</p>
                        <p className="text-xs dark:text-gray-400">Password: {testCredentials.password}</p>
                        <Button variant="outline" size="sm" className="mt-2 w-full dark:text-gray-200 dark:hover:bg-gray-600" onClick={useTestCredentials}>
                          Use Test Account
                        </Button>
                      </div>}
                  </form>
                </TabsContent>
                
                <TabsContent value="phone">
                  <form onSubmit={codeSent ? handlePhoneLogin : handleSendCode} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="dark:text-gray-200">Phone Number</Label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 flex items-center gap-1 pointer-events-none">
                          <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">+91</span>
                        </div>
                        <Input id="phone" type="tel" placeholder="98XX XXX XXX" className="pl-20 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" value={phone.replace('+91', '')} onChange={handlePhoneChange} required disabled={codeSent} maxLength={10} pattern="[0-9]{10}" />
                      </div>
                      <p className="text-xs text-muted-foreground dark:text-gray-400">Enter 10-digit mobile number</p>
                    </div>
                    
                    {codeSent && <div className="space-y-2">
                        <Label htmlFor="code" className="dark:text-gray-200">Verification Code</Label>
                        <Input id="code" type="text" placeholder="Enter 6-digit code" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" required maxLength={6} pattern="[0-9]{6}" />
                      </div>}
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Processing..." : codeSent ? "Verify Code" : "Send Verification Code"}
                    </Button>
                    
                    {codeSent && <Button type="button" variant="outline" className="w-full mt-2 dark:text-gray-200 dark:hover:bg-gray-600" onClick={() => setCodeSent(false)}>
                        Change Phone Number
                      </Button>}
                  </form>
                </TabsContent>
                
                <TabsContent value="linkedin">
                  <div className="space-y-4 mt-4">
                    <p className="text-sm text-muted-foreground dark:text-gray-300">
                      Connect your LinkedIn account for faster sign-in and professional networking.
                    </p>
                    <Button type="button" className="w-full bg-[#0077b5] hover:bg-[#006097]" onClick={loginWithLinkedIn} disabled={loading}>
                      <LinkedinIcon className="mr-2 h-4 w-4" />
                      {loading ? "Connecting..." : "Sign in with LinkedIn"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="organizer">
              <CardTitle className="text-2xl font-bold dark:text-white">Organizer Access</CardTitle>
              <CardDescription className="dark:text-gray-300">Sign in to manage your events</CardDescription>
              
              {error && <Alert variant="destructive" className="mb-4">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>}
              
              <form onSubmit={handleEmailLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="organizer-email" className="dark:text-gray-200">Email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="organizer-email" 
                      type="email" 
                      placeholder="organization@example.com" 
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organizer-password" className="dark:text-gray-200">Password</Label>
                  <Input 
                    id="organizer-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" 
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In as Organizer"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <span className="text-sm text-muted-foreground">
            Want to become an organizer?{' '}
            <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400 font-medium">
              Apply here
            </Link>
          </span>
        </CardFooter>
      </Card>

      <Dialog open={false}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Test Account Instructions</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              How to create and remove test accounts in CollegeNet
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 dark:text-gray-200">
            <p>This test account is only for development and testing purposes. To remove it:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Go to User Management in your authentication system</li>
              <li>Find the account with email: {testCredentials.email}</li>
              <li>Delete the account</li>
            </ol>
          </div>
          <DialogFooter>
            <Button variant="outline" className="dark:text-gray-200 dark:hover:bg-gray-600">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>;
};
