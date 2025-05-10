
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface EncounterProps {
  encounter: {
    visit_date: string;
    chief_complaint: string;
    history_of_present_illness: string;
  };
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const EncounterSection: React.FC<EncounterProps> = ({ encounter, colorScheme }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Encounter Details</CardTitle>
          <span className="text-sm text-gray-500">
            {encounter?.visit_date ? formatDate(encounter.visit_date) : 'Date not available'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Chief Complaint</h4>
            <p className="text-gray-900">{encounter?.chief_complaint || 'Not specified'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">History of Present Illness</h4>
            <p className="text-gray-900 whitespace-pre-line">
              {encounter?.history_of_present_illness || 'Not specified'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EncounterSection;
