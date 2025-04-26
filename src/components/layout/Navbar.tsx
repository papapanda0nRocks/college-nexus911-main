import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, LogOutIcon, UserIcon, PlusIcon, Menu, X, Moon, Sun, Instagram, Twitter, Share, ShieldCheckIcon, Bell, Building } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import { Switch } from "@/components/ui/switch";
import { NotificationDropdown } from "@/components/notification/NotificationDropdown";
import { Badge } from "@/components/ui/badge";

const HandshakeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake">
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    <path d="M12 5.36 8.87 8.5a2.13 2.13 0 0 0 0 3h0a2.13 2.13 0 0 0 3 0l2.26-2.21a2.13 2.13 0 0 0 3 0l2.24 2.2" />
    <path d="M11 13a2.13 2.13 0 0 0 3 0l2.22-2.2a2.13 2.13 0 0 1 3 0v0" />
  </svg>;
  
const CertificateIconCustom = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="9" x2="15" y2="9" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="11" y2="17" />
  </svg>;
  
export const Navbar: React.FC = () => {
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const {
    theme,
    toggleTheme
  } = useTheme();
  const [isProfilePublic, setIsProfilePublic] = useState(user?.isPublic ?? true);
  const location = useLocation();
  
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };
  
  const NavLinks = () => {
    const location = useLocation();
    return (
      <>
        <Link to="/" className={`nav-glass-link${location.pathname === '/' ? ' nav-glass-link-active' : ''}`}>Home</Link>
        <Link to="/events" className={`nav-glass-link${location.pathname.startsWith('/events') ? ' nav-glass-link-active' : ''}`}>Events</Link>
        {isAuthenticated && (
          <Link to="/my-events" className={`nav-glass-link${location.pathname.startsWith('/my-events') ? ' nav-glass-link-active' : ''}`}>My Events</Link>
        )}
        <Link to="/about" className={`nav-glass-link${location.pathname === '/about' ? ' nav-glass-link-active' : ''}`}>About</Link>
      </>
    );
  };
  
  const handleCloseSheet = () => {
    setIsOpen(false);
  };

  return <header className="bg-white dark:bg-[#111827] border-b border-transparent sticky top-0 z-10">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-collegenet-600 dark:text-collegenet-400">CollegeNet</span>
        </Link>

        {isMobile ? <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={handleCloseSheet}>
                  Home
                </Link>
                <Link to="/events" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={handleCloseSheet}>
                  Events
                </Link>
                {isAuthenticated && <Link to="/my-events" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={handleCloseSheet}>
                    My Events
                  </Link>}
                <Link to="/about" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={handleCloseSheet}>
                  About
                </Link>
                {isAuthenticated ? <>
                    <Link to="/profile" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={handleCloseSheet}>
                      <UserIcon className="h-4 w-4 mr-2 inline-block" />
                      Profile
                    </Link>
                    <Link to="/my-history" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={handleCloseSheet}>
                      <CalendarIcon className="h-4 w-4 mr-2 inline-block" />
                      My History
                    </Link>
                    <Link to="/notifications" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={handleCloseSheet}>
                      <Bell className="h-4 w-4 mr-2 inline-block" />
                      Notifications
                    </Link>
                    {user?.role === "organizer" && (
                      <Link to="/organizer/dashboard" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={handleCloseSheet}>
                        <Building className="h-4 w-4 mr-2 inline-block" />
                        Organizer Dashboard
                      </Link>
                    )}
                    {user?.role === "admin" && (
                      <Link to="/admin/dashboard" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={handleCloseSheet}>
                        <ShieldCheckIcon className="h-4 w-4 mr-2 inline-block" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Button variant="destructive" className="mt-4" onClick={() => {
                logout();
                handleCloseSheet();
              }}>
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </> : <Link to="/login" onClick={handleCloseSheet}>
                    <Button className="w-full mt-4">Sign In</Button>
                  </Link>}
                <div className="flex items-center justify-between py-2 px-4 mt-4">
                  <span>Dark Mode</span>
                  <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                </div>
              </nav>
            </SheetContent>
          </Sheet> : <nav className="nav-glass-container">
            <NavLinks />
          </nav>}

        {!isAuthenticated && <div className="flex items-center space-x-4">
          <Link to="/login">
            
          </Link>
        </div>}

        {isAuthenticated ? <div className="flex items-center space-x-2">
            {/* Notification Icon */}
            <NotificationDropdown />
            
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.profilePicture} alt={user?.name} />
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  </Avatar>
                  {user?.verificationStatus === "verified" && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-green-500">
                      ✓
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span>{user?.name || "User"}</span>
                      {user?.verificationStatus === "verified" && (
                        <Badge variant="outline" className="text-xs bg-green-500 text-white border-green-500">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{user?.email || user?.phone}</span>
                    <span className="text-xs font-medium text-collegenet-600 mt-1 capitalize">{user?.role}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Public Profile
                    </span>
                    <Switch checked={isProfilePublic} onCheckedChange={(value) => {
                      setIsProfilePublic(value);
                    }} />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-history" className="flex cursor-pointer">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    My History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/notifications" className="flex cursor-pointer">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Link>
                </DropdownMenuItem>
                {user?.role === "organizer" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/organizer/dashboard" className="flex cursor-pointer">
                        <Building className="mr-2 h-4 w-4" />
                        Organizer Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/create-event" className="flex cursor-pointer">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Create Event
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user?.role === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard" className="flex cursor-pointer">
                        <ShieldCheckIcon className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user?.verificationStatus !== "verified" && (
                  <DropdownMenuItem asChild>
                    <Link to="/verification-prompt" className="flex cursor-pointer">
                      <ShieldCheckIcon className="mr-2 h-4 w-4" />
                      Verify Account
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/certificates" className="flex cursor-pointer">
                    <CertificateIconCustom />
                    Certificates
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> : <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/login">
              <Button className="bg-collegenet-600 text-white hover:bg-collegenet-700 dark:bg-collegenet-500 dark:hover:bg-collegenet-600">
                Sign In
              </Button>
            </Link>
          </div>}
      </div>
    </header>;
};
