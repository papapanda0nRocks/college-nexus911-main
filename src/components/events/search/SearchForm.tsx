
import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchFilters } from "@/types/search";

interface SearchFormProps {
  query: string;
  onQueryChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  query,
  onQueryChange,
  showFilters,
  onToggleFilters,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-10 pr-4 w-full"
        />
      </div>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onToggleFilters}
        className="ml-2"
      >
        Filters {showFilters ? <X className="ml-1 h-3 w-3" /> : null}
      </Button>
      <Button type="submit" className="ml-2">
        Search
      </Button>
    </form>
  );
};
