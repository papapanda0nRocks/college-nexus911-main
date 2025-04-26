
import React from "react";
interface Props {
  data: any;
}
export const StepPreview = ({ data }: Props) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Preview Your Application</h3>
    <div className="bg-muted/50 p-4 rounded-md space-y-3">
      <div>
        <span className="font-semibold block">Name:</span>
        <span>{data.name}</span>
      </div>
      <div>
        <span className="font-semibold block">Organization:</span>
        <span>{data.organization}</span>
      </div>
      <div>
        <span className="font-semibold block">Title:</span>
        <span>{data.title}</span>
      </div>
      <div>
        <span className="font-semibold block">Bio:</span>
        <span>{data.bio}</span>
      </div>
      <div>
        <span className="font-semibold block">Contact Email:</span>
        <span>{data.contactEmail}</span>
      </div>
      {data.website && (
        <div>
          <span className="font-semibold block">Website:</span>
          <span>{data.website}</span>
        </div>
      )}
    </div>
    <p className="text-sm text-muted-foreground">
      Please review your information carefully. Once submitted, our team will review your application within 2-3 business days.
    </p>
  </div>
);
