
import React from 'react';
import EditableSection from './EditableSection';

interface SocialHistoryProps {
  socialHistory: Array<{
    patient_id: string;
    drinking: string;
    smoking: string;
    drugs: string;
    marital_status: string;
    kids: number;
    job: string;
  }>;
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const SocialHistorySection: React.FC<SocialHistoryProps> = ({ socialHistory, colorScheme }) => {
  if (!socialHistory || socialHistory.length === 0) return null;
  
  // Take just the first entry since this is usually per-patient
  const history = socialHistory[0];

  return (
    <EditableSection title="Social History">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Smoking</h4>
          <p className="text-gray-900">{history.smoking || 'No data'}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Drinking</h4>
          <p className="text-gray-900">{history.drinking || 'No data'}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Drugs</h4>
          <p className="text-gray-900">{history.drugs || 'No data'}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Marital Status</h4>
          <p className="text-gray-900">{history.marital_status || 'No data'}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Children</h4>
          <p className="text-gray-900">{history.kids !== undefined ? history.kids : 'No data'}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Occupation</h4>
          <p className="text-gray-900">{history.job || 'No data'}</p>
        </div>
      </div>
    </EditableSection>
  );
};

export default SocialHistorySection;
