
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CertificateGenerator: React.FC = () => {
  return (
    <Card className="my-4">
      <CardContent>
        <p className="mb-2 font-medium text-lg">Certificate Generator (WIP)</p>
        <p className="text-muted-foreground text-sm">
          You will be able to generate and manage certificates for event attendees.
        </p>
      </CardContent>
    </Card>
  );
};
export default CertificateGenerator;
