
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Image, Link, Paperclip, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PostCreator: React.FC = () => {
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"all" | "verified" | "specific">("all");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(false);
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (tagInput.trim() && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments([...attachments, ...newFiles]);
    }
  };
  
  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (publishNow: boolean) => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Missing title",
        description: "Please provide a title for your post",
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        variant: "destructive",
        title: "Missing content",
        description: "Please provide content for your post",
      });
      return;
    }
    
    setLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: publishNow ? "Post published!" : "Draft saved!",
        description: publishNow ? "Your post has been published successfully" : "Your draft has been saved",
      });
      
      // Reset form
      setTitle("");
      setContent("");
      setVisibility("all");
      setTags([]);
      setAttachments([]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save post. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Tabs defaultValue="write">
              <TabsList>
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="write">
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="border rounded-md p-4 min-h-[200px]">
                  {content ? (
                    <div className="prose dark:prose-invert max-w-none">
                      {content.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Nothing to preview</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select 
              value={visibility} 
              onValueChange={(value: "all" | "verified" | "specific") => setVisibility(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="verified">Verified Students Only</SelectItem>
                <SelectItem value="specific">Specific Groups</SelectItem>
              </SelectContent>
            </Select>
            {visibility === "specific" && (
              <p className="text-sm text-muted-foreground">
                Group targeting options will be available soon.
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <div 
                  key={tag} 
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTag(tag)} 
                    className="ml-1 hover:text-destructive"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <Input
              id="tags"
              placeholder="Add tags (press Enter or comma to add)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <p className="text-xs text-muted-foreground">
              Tags will help students find your post more easily
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {attachments.map((file, index) => (
                <div 
                  key={index} 
                  className="bg-muted px-3 py-1 rounded-md text-sm flex items-center gap-1"
                >
                  <Paperclip className="h-3 w-3" />
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveAttachment(index)} 
                    className="ml-1 hover:text-destructive"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <label className="cursor-pointer">
                  <Image className="h-4 w-4 mr-1" />
                  Add Image
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAttachmentChange}
                  />
                </label>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <label className="cursor-pointer">
                  <Paperclip className="h-4 w-4 mr-1" />
                  Add File
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleAttachmentChange} 
                  />
                </label>
              </Button>
              <Button variant="outline" size="sm">
                <Link className="h-4 w-4 mr-1" />
                Add Link
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => handleSubmit(false)}
          disabled={loading}
        >
          <Save className="h-4 w-4 mr-2" />
          {loading && status === "draft" ? "Saving..." : "Save Draft"}
        </Button>
        <Button
          onClick={() => handleSubmit(true)}
          disabled={loading}
        >
          <Check className="h-4 w-4 mr-2" />
          {loading && status === "published" ? "Publishing..." : "Publish Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};
