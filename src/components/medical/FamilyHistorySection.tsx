
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FamilyHistoryProps {
  familyHistory: Array<{
    relative_name: string;
    history: string;
  }>;
}

const FamilyHistorySection: React.FC<FamilyHistoryProps> = ({ familyHistory }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Family History</CardTitle>
      </CardHeader>
      <CardContent>
        {familyHistory && familyHistory.length > 0 ? (
          <div className="space-y-3">
            {familyHistory.map((item, index) => (
              <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <h4 className="font-medium text-gray-900">{item.relative_name}</h4>
                <p className="text-gray-700">{item.history}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-3 text-center text-gray-500">No family history recorded</div>
        )}
      </CardContent>
    </Card>
  );
};

export default FamilyHistorySection;
