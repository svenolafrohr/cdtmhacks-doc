
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import EditableSection from './EditableSection';

interface ReviewOfSystemsProps {
  reviewOfSystems: Array<{
    encounter_id: string;
    system_name: string;
    details: string;
  }>;
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const ReviewOfSystemsSection: React.FC<ReviewOfSystemsProps> = ({ reviewOfSystems, colorScheme }) => {
  if (!reviewOfSystems || reviewOfSystems.length === 0) return null;

  return (
    <EditableSection title="Review of Systems">
      <div className="space-y-3">
        {reviewOfSystems.map((item, index) => (
          <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
            <h4 className="font-medium text-gray-900">{item.system_name}</h4>
            <p className="text-gray-700">{item.details}</p>
          </div>
        ))}
      </div>
    </EditableSection>
  );
};

export default ReviewOfSystemsSection;
