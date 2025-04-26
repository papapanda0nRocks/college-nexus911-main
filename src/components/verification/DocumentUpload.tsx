
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, UploadIcon, TrashIcon, AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const DocumentUpload: React.FC = () => {
  const { uploadVerificationDocument } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [governmentIdFile, setGovernmentIdFile] = useState<File | null>(null);
  const [collegeIdFile, setCollegeIdFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "governmentId" | "collegeId"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Maximum file size is 5MB",
        });
        return;
      }
      
      // Check file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF or image file (JPG, JPEG, PNG)",
        });
        return;
      }
      
      if (type === "governmentId") {
        setGovernmentIdFile(file);
      } else {
        setCollegeIdFile(file);
      }
    }
  };
  
  const removeFile = (type: "governmentId" | "collegeId") => {
    if (type === "governmentId") {
      setGovernmentIdFile(null);
    } else {
      setCollegeIdFile(null);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      if (governmentIdFile) {
        await uploadVerificationDocument("governmentId", governmentIdFile);
      }
      
      if (collegeIdFile) {
        await uploadVerificationDocument("collegeId", collegeIdFile);
      }
      
      toast({
        title: "Documents uploaded successfully",
        description: "Your documents have been submitted for verification.",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Failed to upload documents:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your documents. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const renderFilePreview = (file: File | null, type: "governmentId" | "collegeId") => {
    if (!file) return null;
    
    return (
      <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
        <FileIcon className="h-5 w-5 mr-2 text-blue-500" />
        <span className="text-sm truncate flex-1">{file.name}</span>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={() => removeFile(type)}
        >
          <TrashIcon className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    );
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Upload Verification Documents</CardTitle>
          <CardDescription>
            Please upload clear photos or scans of your government ID and college ID card
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="government-id">Government ID *</Label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4">
                {governmentIdFile ? (
                  renderFilePreview(governmentIdFile, "governmentId")
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <UploadIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      PDF, JPG, JPEG or PNG (Max 5MB)
                    </p>
                    <Input
                      id="government-id"
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleFileChange(e, "governmentId")}
                      required={!governmentIdFile}
                    />
                    <Label
                      htmlFor="government-id"
                      className="mt-2 bg-gray-100 dark:bg-gray-800 py-1.5 px-3 rounded-md text-sm cursor-pointer"
                    >
                      Select File
                    </Label>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Passport, Driver's License, National ID, etc.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="college-id">College/University ID *</Label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4">
                {collegeIdFile ? (
                  renderFilePreview(collegeIdFile, "collegeId")
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <UploadIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      PDF, JPG, JPEG or PNG (Max 5MB)
                    </p>
                    <Input
                      id="college-id"
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleFileChange(e, "collegeId")}
                      required={!collegeIdFile}
                    />
                    <Label
                      htmlFor="college-id"
                      className="mt-2 bg-gray-100 dark:bg-gray-800 py-1.5 px-3 rounded-md text-sm cursor-pointer"
                    >
                      Select File
                    </Label>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Student ID card issued by your educational institution
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <div className="flex space-x-2">
                <AlertCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div className="text-sm text-blue-800 dark:text-blue-300">
                  <p className="font-medium">Privacy Notice</p>
                  <p>Your documents are securely stored and only used for verification purposes.</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button type="button" variant="outline" onClick={() => navigate("/")}>
                Skip for Now
              </Button>
              <Button 
                type="submit" 
                disabled={uploading || (!governmentIdFile && !collegeIdFile)}
              >
                {uploading ? "Uploading..." : "Submit for Verification"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
