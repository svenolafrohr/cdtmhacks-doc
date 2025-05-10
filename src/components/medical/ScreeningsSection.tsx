
import React from 'react';
import { formatDate } from '@/lib/utils';
import EditableSection from './EditableSection';

interface ScreeningsProps {
  procedures: Array<{
    patient_id: string;
    type: string;
    date: string;
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

const ScreeningsSection: React.FC<ScreeningsProps> = ({ procedures, colorScheme }) => {
  // Always display the section, even if empty
  return (
    <EditableSection title="Screenings">
      {procedures && procedures.length > 0 ? (
        <div className="space-y-4">
          {procedures.map((procedure, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-gray-900">{procedure.type}</span>
                <span className="text-sm text-gray-500">
                  {procedure.date ? formatDate(procedure.date).split(',')[0] : 'Date not available'}
                </span>
              </div>
              <p className="text-gray-700">{procedure.details || 'No details provided'}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-3 text-center text-gray-500">No screenings recorded</div>
      )}
    </EditableSection>
  );
};

export default ScreeningsSection;
