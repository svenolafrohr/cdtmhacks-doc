
import React from 'react';
import { Visit, Diagnosis } from '@/data/mockData';

interface DiagnosisCardProps {
  visit: Visit;
  diagnoses: Diagnosis[];
}

const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ visit, diagnoses }) => {
  const visitDiagnoses = diagnoses.filter(d => d.visitId === visit.id);

  return (
    <div className="medical-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="dashboard-section-title">Diagnosis</h3>
        <button className="text-xs px-2.5 py-1 text-medical-primary hover:bg-medical-accent hover:bg-opacity-50 rounded transition-colors">
          + Add Diagnosis
        </button>
      </div>

      <div className="space-y-4">
        {visitDiagnoses.length > 0 ? (
          visitDiagnoses.map((diagnosis) => (
            <div key={diagnosis.id} className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between">
                <div className="font-medium text-gray-800">{diagnosis.description}</div>
                <div className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                  {diagnosis.icd10Code}
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <button className="text-xs px-2.5 py-1 text-medical-primary hover:underline transition-colors">
                  Edit Diagnosis
                </button>
                <button className="text-xs px-2.5 py-1 text-gray-500 hover:underline transition-colors">
                  View Related Notes
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 italic py-4">
            No diagnosis has been recorded for this visit
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisCard;
