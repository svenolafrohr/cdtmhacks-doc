
import React from 'react';
import EditableSection from './EditableSection';

interface ProceduresProps {
  procedures: Array<{
    patient_id: string;
    type: string;
    date: string;
    details: string;
  }>;
}

const ProceduresSection: React.FC<ProceduresProps> = ({ procedures }) => {
  if (!procedures || procedures.length === 0) return null;

  return (
    <EditableSection title="Procedures">
      <div className="space-y-4">
        {procedures.map((procedure, index) => (
          <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-gray-900">{procedure.type}</span>
              <span className="text-sm text-gray-500">{procedure.date}</span>
            </div>
            <p className="text-gray-700">{procedure.details}</p>
          </div>
        ))}
      </div>
    </EditableSection>
  );
};

export default ProceduresSection;
