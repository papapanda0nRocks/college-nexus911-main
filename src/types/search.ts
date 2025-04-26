
export interface SearchFilters {
  query: string;
  category: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  location: string;
  maxDistance: number;
  priceRange: number[];
  eventType: "all" | "inPerson" | "virtual";
}

export const DEFAULT_FILTERS: SearchFilters = {
  query: "",
  category: "All Categories",
  startDate: undefined,
  endDate: undefined,
  location: "",
  maxDistance: 50,
  priceRange: [0, 100],
  eventType: "all"
};
