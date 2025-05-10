
import React from 'react';
import EditableSection from './EditableSection';

interface FamilyHistoryProps {
  familyHistory: Array<{
    relative_name: string;
    history: string;
  }>;
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const FamilyHistorySection: React.FC<FamilyHistoryProps> = ({ familyHistory, colorScheme }) => {
  return (
    <EditableSection title="Family History">
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
    </EditableSection>
  );
};

export default FamilyHistorySection;
