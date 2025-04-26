
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FileText, Users, Building, Eye, CheckCircle, XCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockPendingOrganizers = [
  { 
    id: "1", 
    name: "Tech University", 
    contactName: "John Smith", 
    email: "john@techuniversity.edu", 
    type: "university",
    submittedAt: "2023-04-10T14:30:00Z"
  },
  { 
    id: "2", 
    name: "Career Connect", 
    contactName: "Sarah Johnson", 
    email: "sarah@careerconnect.com", 
    type: "company",
    submittedAt: "2023-04-12T09:15:00Z"
  },
  { 
    id: "3", 
    name: "Student Union", 
    contactName: "Mark Williams", 
    email: "mark@studentunion.org", 
    type: "non-profit",
    submittedAt: "2023-04-13T11:45:00Z"
  }
];

const mockPendingKyc = [
  { 
    id: "1", 
    name: "Alex Johnson", 
    email: "alex@example.com", 
    submittedAt: "2023-04-15T10:30:00Z",
    documents: { governmentId: true, collegeId: true }
  },
  { 
    id: "2", 
    name: "Maria Garcia", 
    email: "maria@example.com", 
    submittedAt: "2023-04-16T14:20:00Z",
    documents: { governmentId: true, collegeId: true }
  },
  { 
    id: "3", 
    name: "James Wilson", 
    email: "james@example.com", 
    submittedAt: "2023-04-17T09:45:00Z",
    documents: { governmentId: true, collegeId: false }
  },
  { 
    id: "4", 
    name: "Sophia Chen", 
    email: "sophia@example.com", 
    submittedAt: "2023-04-17T16:10:00Z",
    documents: { governmentId: true, collegeId: true }
  }
];

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("organizers");
  const [selectedFilter, setSelectedFilter] = useState("pending");
  const [viewDocumentDialog, setViewDocumentDialog] = useState<{
    open: boolean;
    userId?: string;
    userName?: string;
    documentType?: "governmentId" | "collegeId";
  }>({
    open: false
  });
  
  // Redirect if not authenticated or not an admin
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  
  const filteredOrganizers = mockPendingOrganizers.filter(org => 
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredKyc = mockPendingKyc.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };
  
  const handleOrganizerStatusChange = (organizerId: string, status: "approved" | "rejected") => {
    // In a real app, this would call an API
    toast({
      title: `Organizer ${status === "approved" ? "approved" : "rejected"}`,
      description: `You have ${status} the organization's application.`,
    });
  };
  
  const handleKycStatusChange = (userId: string, status: "verified" | "rejected") => {
    // In a real app, this would call an API
    toast({
      title: `User verification ${status === "verified" ? "approved" : "rejected"}`,
      description: `You have ${status === "verified" ? "verified" : "rejected"} the user's documents.`,
    });
  };
  
  const handleViewDocument = (userId: string, userName: string, type: "governmentId" | "collegeId") => {
    setViewDocumentDialog({
      open: true,
      userId,
      userName,
      documentType: type
    });
  };
  
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${selectedTab}...`}
              className="pl-9 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <Tabs defaultValue="organizers" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="organizers" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Organizer Applications</span>
              <Badge variant="secondary" className="ml-2">{mockPendingOrganizers.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="kyc" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>KYC Verification</span>
              <Badge variant="secondary" className="ml-2">{mockPendingKyc.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="organizers">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No organizer applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrganizers.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell>
                        <div className="font-medium">{org.name}</div>
                        <div className="text-sm text-muted-foreground">{org.email}</div>
                      </TableCell>
                      <TableCell>{org.contactName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {org.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(org.submittedAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => handleOrganizerStatusChange(org.id, "approved")}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleOrganizerStatusChange(org.id, "rejected")}>
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="kyc">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKyc.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No verification requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredKyc.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${student.id}`} />
                            <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span>{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDocument(student.id, student.name, "governmentId")}
                            disabled={!student.documents.governmentId}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            ID
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDocument(student.id, student.name, "collegeId")}
                            disabled={!student.documents.collegeId}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            College ID
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(student.submittedAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => handleKycStatusChange(student.id, "verified")}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Verify
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleKycStatusChange(student.id, "rejected")}>
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
      
      <Dialog open={viewDocumentDialog.open} onOpenChange={(open) => setViewDocumentDialog({ ...viewDocumentDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {viewDocumentDialog.userName}'s {viewDocumentDialog.documentType === "governmentId" ? "Government ID" : "College ID"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-center py-6">
            {/* Placeholder for document image/preview */}
            <div className="border border-dashed border-muted rounded-md p-10 flex items-center justify-center">
              <Eye className="h-10 w-10 text-muted-foreground" />
              <p className="ml-2 text-muted-foreground">Document preview would appear here</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (viewDocumentDialog.userId) {
                  handleKycStatusChange(viewDocumentDialog.userId, "rejected");
                  setViewDocumentDialog({ open: false });
                }
              }}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button 
              onClick={() => {
                if (viewDocumentDialog.userId) {
                  handleKycStatusChange(viewDocumentDialog.userId, "verified");
                  setViewDocumentDialog({ open: false });
                }
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
