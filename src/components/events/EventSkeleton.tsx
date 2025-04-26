
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const EventCardSkeleton = () => {
  return (
    <div className="h-full overflow-hidden rounded-lg border bg-card">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-4 w-full" />
        
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex">
              <Skeleton className="h-4 w-4 mr-2" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
        
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    </div>
  );
};

export const EventListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const EventDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Skeleton className="h-10 w-24 mb-4" />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-40" />
            </div>

            <Skeleton className="h-10 w-3/4 mb-4" />

            <div className="space-y-4 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-3" />
                  <Skeleton className="h-5 w-40" />
                </div>
              ))}
            </div>

            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-24 w-full" />
          </div>

          <div className="md:w-1/3">
            <div className="border rounded-lg p-6">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
