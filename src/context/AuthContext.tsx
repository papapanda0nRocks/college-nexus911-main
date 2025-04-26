import React, { createContext, useState, useEffect, useContext } from "react";
import { User, UserRole, AuthContextType, AuthState } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    if (storedUser && storedIsAuthenticated === "true") {
      try {
        const user = JSON.parse(storedUser);
        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: true,
          user: user,
          loading: false,
        }));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setAuthState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    } else {
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  }, []);

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    setAuthState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      if (credentials.email === "test@collegenet.com" && credentials.password === "Test@123") {
        const userDetails = {
          id: "test-123",
          name: "Test User",
          email: credentials.email,
          phone: "+91987654321",
          linkedinId: "testuser",
          profilePicture: "",
          role: "student" as UserRole,
          bio: "This is a test account for demonstration purposes.",
          isPublic: true,
        };

        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: true,
          user: userDetails,
          loading: false,
        }));
        localStorage.setItem("user", JSON.stringify(userDetails));
        localStorage.setItem("isAuthenticated", "true");
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${userDetails.name}!`,
        });
        
        // Handle redirect after login
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        } else {
          navigate("/");
        }
      } else {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const user = userCredential.user;
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            const userDetails = {
              id: user.uid,
              name: userData.name,
              email: user.email,
              phone: userData.phone,
              linkedinId: userData.linkedinId,
              profilePicture: userData.profilePicture,
              role: userData.role as UserRole,
              bio: userData.bio,
              isPublic: userData.isPublic,
            };

            setAuthState((prevState) => ({
              ...prevState,
              isAuthenticated: true,
              user: userDetails,
              loading: false,
            }));
            localStorage.setItem("user", JSON.stringify(userDetails));
            localStorage.setItem("isAuthenticated", "true");
            toast({
              title: "Login Successful!",
              description: `Welcome back, ${userDetails.name}!`,
            });
            
            // Handle redirect after login
            const redirectPath = localStorage.getItem("redirectAfterLogin");
            if (redirectPath) {
              localStorage.removeItem("redirectAfterLogin");
              navigate(redirectPath);
            } else {
              navigate("/");
            }
          } else {
            throw new Error("User data not found");
          }
        } catch (error) {
          throw error;
        }
      }
    } catch (error: any) {
      console.error("Login failed", error.message);
      setAuthState((prevState) => ({
        ...prevState,
        error: "Invalid email or password.",
        loading: false,
      }));
      toast({
        title: "Login Failed!",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  const loginWithLinkedIn = async (): Promise<void> => {
    setAuthState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        id: "123",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "student" as UserRole,
        bio: "Software Engineer",
        isPublic: true,
      };

      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        user: mockUser,
        loading: false,
      }));
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${mockUser.name}!`,
      });
      navigate("/");
    } catch (error: any) {
      console.error("LinkedIn login failed", error.message);
      setAuthState((prevState) => ({
        ...prevState,
        error: "LinkedIn login failed.",
        loading: false,
      }));
      toast({
        title: "Login Failed!",
        description: "LinkedIn login failed.",
        variant: "destructive",
      });
    }
  };

  const loginWithPhone = async (
    phone: string,
    code: string
  ): Promise<void> => {
    setAuthState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (code === "123456") {
        const mockUser = {
          id: "456",
          name: "Jane Doe",
          phone: phone,
          role: "organizer" as UserRole,
          bio: "Event Organizer",
          isPublic: false,
        };

        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: true,
          user: mockUser,
          loading: false,
        }));
        localStorage.setItem("user", JSON.stringify(mockUser));
        localStorage.setItem("isAuthenticated", "true");
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${mockUser.name}!`,
        });
        navigate("/");
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error: any) {
      console.error("Phone login failed", error.message);
      setAuthState((prevState) => ({
        ...prevState,
        error: "Phone login failed.",
        loading: false,
      }));
      toast({
        title: "Login Failed!",
        description: "Phone login failed.",
        variant: "destructive",
      });
    }
  };

  const sendPhoneCode = async (phone: string): Promise<void> => {
    setAuthState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Sending code to", phone);
      toast({
        title: "Code Sent!",
        description: "Please check your phone for the verification code.",
      });
    } catch (error: any) {
      console.error("Failed to send code", error.message);
      setAuthState((prevState) => ({
        ...prevState,
        error: "Failed to send verification code.",
        loading: false,
      }));
      toast({
        title: "Failed to Send Code!",
        description: "Failed to send verification code.",
        variant: "destructive",
      });
    } finally {
      setAuthState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const logout = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    signOut(auth);
    toast({
      description: "Logged out successfully!",
    });
    navigate("/login");
  };

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    setAuthState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = { ...authState.user, ...userData };
      setAuthState((prevState) => ({
        ...prevState,
        user: updatedUser,
        loading: false,
      }));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast({
        description: "Profile updated successfully!",
      });
    } catch (error: any) {
      console.error("Update profile failed", error.message);
      setAuthState((prevState) => ({
        ...prevState,
        error: "Failed to update profile.",
        loading: false,
      }));
      toast({
        title: "Update Failed!",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  const testAccountLogin = async () => {
    setAuthState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const testUser = {
        id: "test-user-123",
        name: "Test User",
        email: "test@collegenet.com",
        phone: "+91987654321",
        role: "student" as UserRole,
        bio: "This is a test account for demonstration purposes.",
        isPublic: true,
      };

      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        user: testUser,
        loading: false,
      }));
      localStorage.setItem("user", JSON.stringify(testUser));
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${testUser.name}!`,
      });
      navigate("/");
    } catch (error: any) {
      setAuthState((prevState) => ({
        ...prevState,
        error: "Failed to login with test account",
        loading: false,
      }));
    }
  };

  const register = async (userData: Partial<User>, password: string): Promise<void> => {
    setAuthState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email!,
        password
      );
      const user = userCredential.user;

      const userDetails = {
        id: user.uid,
        name: userData.name,
        email: user.email,
        phone: userData.phone,
        role: userData.role || "student",
        bio: userData.bio,
        isPublic: userData.isPublic ?? true,
        verificationStatus: "unverified" as VerificationStatus,
      };

      await setDoc(doc(db, "users", user.uid), userDetails);

      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        user: userDetails,
        loading: false,
      }));
      localStorage.setItem("user", JSON.stringify(userDetails));
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "Registration Successful!",
        description: `Welcome to CollegeNet, ${userDetails.name}!`,
      });
      navigate("/");
    } catch (error: any) {
      console.error("Registration failed", error.message);
      setAuthState((prevState) => ({
        ...prevState,
        error: "Registration failed. Please try again.",
        loading: false,
      }));
      toast({
        title: "Registration Failed!",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const uploadVerificationDocument = async (
    type: "governmentId" | "collegeId",
    file: File
  ): Promise<void> => {
    if (!authState.user?.id) {
      throw new Error("User not authenticated");
    }

    setAuthState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userDocRef = doc(db, "users", authState.user.id);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const verificationDocuments = {
          ...userData.verificationDocuments,
          [type]: "uploaded",
          uploadDate: new Date().toISOString(),
        };

        await setDoc(
          userDocRef,
          {
            verificationDocuments,
            verificationStatus: "pending",
          },
          { merge: true }
        );

        setAuthState((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user!,
            verificationDocuments,
            verificationStatus: "pending",
          },
          loading: false,
        }));
        localStorage.setItem("user", JSON.stringify({
          ...prevState.user!,
          verificationDocuments,
          verificationStatus: "pending",
        }));

        toast({
          title: "Document Uploaded!",
          description: "Your verification document has been uploaded successfully.",
        });
      }
    } catch (error: any) {
      console.error("Document upload failed", error.message);
      setAuthState((prevState) => ({
        ...prevState,
        error: "Document upload failed. Please try again.",
        loading: false,
      }));
      toast({
        title: "Upload Failed!",
        description: "Document upload failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const checkVerificationStatus = async (): Promise<VerificationStatus> => {
    if (!authState.user?.id) {
      throw new Error("User not authenticated");
    }

    try {
      const userDocRef = doc(db, "users", authState.user.id);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        return userData.verificationStatus || "unverified";
      }
      return "unverified";
    } catch (error) {
      console.error("Failed to check verification status", error);
      return "unverified";
    }
  };

  const value = {
    ...authState,
    login,
    loginWithLinkedIn,
    loginWithPhone,
    sendPhoneCode,
    logout,
    updateUser,
    testAccountLogin,
    register,
    uploadVerificationDocument,
    checkVerificationStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
