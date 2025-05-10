
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { parseJsonbField } from '@/lib/utils';

interface AllergiesProps {
  allergies: any[] | null;
}

const AllergiesSection: React.FC<AllergiesProps> = ({ allergies }) => {
  if (!allergies || allergies.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Allergies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {allergies.map((allergy, index) => (
            <span 
              key={index} 
              className="bg-red-50 text-red-700 text-sm px-3 py-1 rounded-full"
            >
              {allergy.icd10_code || allergy.name || "Unknown allergy"}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllergiesSection;
