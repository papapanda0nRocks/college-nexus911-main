
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { SearchFilters, DEFAULT_FILTERS } from "@/types/search";
import { SearchForm } from "./search/SearchForm";
import { CategoryFilter } from "./search/CategoryFilter";
import { DateRangeFilter } from "./search/DateRangeFilter";
import { LocationFilter } from "./search/LocationFilter";
import { PriceRangeFilter } from "./search/PriceRangeFilter";
import { EventTypeFilter } from "./search/EventTypeFilter";

const CATEGORIES = [
  "All Categories",
  "Networking",
  "Workshop",
  "Career",
  "Academic",
  "Social",
  "Conference",
  "Hackathon",
  "Seminar"
];

interface EnhancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export const EnhancedSearch: React.FC<EnhancedSearchProps> = ({ onSearch }) => {
  const { isAuthenticated } = useAuth();
  const [filters, setFilters] = useState<SearchFilters>({...DEFAULT_FILTERS});
  const [showFilters, setShowFilters] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">Please sign in to access advanced search features.</p>
        <Button asChild className="mt-4">
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({...DEFAULT_FILTERS});
  };

  return (
    <div className="w-full space-y-4">
      <SearchForm
        query={filters.query}
        onQueryChange={(value) => setFilters({ ...filters, query: value })}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onSubmit={handleSearchSubmit}
      />

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-card p-4 rounded-md border">
          <CategoryFilter
            value={filters.category}
            onChange={(value) => setFilters({ ...filters, category: value })}
            categories={CATEGORIES}
          />

          <DateRangeFilter
            startDate={filters.startDate}
            endDate={filters.endDate}
            onStartDateChange={(date) => setFilters({ ...filters, startDate: date })}
            onEndDateChange={(date) => setFilters({ ...filters, endDate: date })}
          />

          <LocationFilter
            location={filters.location}
            maxDistance={filters.maxDistance}
            onLocationChange={(value) => setFilters({ ...filters, location: value })}
            onDistanceChange={(value) => setFilters({ ...filters, maxDistance: value })}
          />

          <PriceRangeFilter
            priceRange={filters.priceRange}
            onChange={(values) => setFilters({ ...filters, priceRange: values })}
          />

          <EventTypeFilter
            value={filters.eventType}
            onChange={(value) => setFilters({ ...filters, eventType: value })}
          />

          <div className="col-span-full flex justify-end">
            <Button variant="outline" onClick={clearFilters} className="mr-2">
              Clear Filters
            </Button>
            <Button type="submit" onClick={handleSearchSubmit}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
