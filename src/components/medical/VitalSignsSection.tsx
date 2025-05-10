
import React from 'react';
import { formatDate } from '@/lib/utils';
import EditableSection from './EditableSection';

interface VitalSignsProps {
  vitalSigns: {
    datetime: string;
    weight: number;
    height: number;
    bmi: number;
  };
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const VitalSignsSection: React.FC<VitalSignsProps> = ({ vitalSigns, colorScheme }) => {
  if (!vitalSigns) return null;

  return (
    <EditableSection title="Vital Signs">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">
          {vitalSigns.datetime ? formatDate(vitalSigns.datetime) : 'Date not available'}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Height</h4>
          <p className="text-gray-900">{vitalSigns.height} cm</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Weight</h4>
          <p className="text-gray-900">{vitalSigns.weight} kg</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">BMI</h4>
          <p className="text-gray-900">{vitalSigns.bmi}</p>
        </div>
      </div>
    </EditableSection>
  );
};

export default VitalSignsSection;
