
import React, { useMemo } from 'react';
import EditableSection from './EditableSection';

interface Immunization {
  patient_id: string;
  date: string;
  disease: string;
  vaccine_name: string;
  batch_number: string;
  best_before: string;
  doctor_name: string;
  doctor_address: any;
  details: string;
}

interface ImmunizationsProps {
  immunizations: Array<Immunization> | { [key: string]: any } | null | undefined;
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const ImmunizationsSection: React.FC<ImmunizationsProps> = ({ immunizations, colorScheme }) => {
  // Normalize the immunizations data to always be an array
  const immunizationArray = useMemo(() => {
    // If immunizations is undefined or null, return empty array
    if (!immunizations) return [];
    
    // If immunizations is already an array, use it directly
    if (Array.isArray(immunizations)) {
      return immunizations;
    }
    
    // If it's an object, check if it has values that can be converted to an array
    if (typeof immunizations === 'object') {
      const values = Object.values(immunizations);
      if (Array.isArray(values) && values.length > 0) {
        return values;
      }
    }
    
    // Return empty array as fallback
    return [];
  }, [immunizations]);

  // If there are no immunizations after normalization, return null
  if (immunizationArray.length === 0) return null;

  return (
    <EditableSection title="Immunizations">
      <div className="space-y-4">
        {immunizationArray.map((immunization, index) => (
          <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-gray-900">{immunization.disease}</span>
              <span className="text-sm text-gray-500">{immunization.date}</span>
            </div>
            
            <div className="mt-1">
              <div className="text-sm text-gray-700">
                Vaccine: {immunization.vaccine_name}
              </div>
              <div className="text-sm text-gray-500">
                Batch: {immunization.batch_number} (Best before: {immunization.best_before})
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Doctor: {immunization.doctor_name}
              </div>
              {immunization.details && (
                <div className="text-sm text-gray-700 mt-1">{immunization.details}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </EditableSection>
  );
};

export default ImmunizationsSection;
