
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface AllergiesProps {
  allergies: any[] | null;
}

const AllergiesSection: React.FC<AllergiesProps> = ({ allergies }) => {
  // Always display the section, even if empty
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-red-500" />
          <CardTitle className="text-lg font-semibold">Allergies</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {allergies && allergies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {allergies.map((allergy, index) => (
              <span 
                key={index} 
                className="bg-red-50 text-red-700 text-sm px-3 py-1 rounded-full"
              >
                {(allergy.name || "Unknown allergy")}
                {allergy.icd10_code && ` (${allergy.icd10_code})`}
              </span>
            ))}
          </div>
        ) : (
          <div className="py-3 text-center text-gray-500">No allergies recorded</div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllergiesSection;
