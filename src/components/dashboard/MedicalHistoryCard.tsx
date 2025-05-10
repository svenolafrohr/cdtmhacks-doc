
import React from 'react';
import { MedicalHistory } from '@/data/mockData';

interface MedicalHistoryCardProps {
  medicalHistory: MedicalHistory[];
}

const MedicalHistoryCard: React.FC<MedicalHistoryCardProps> = ({ medicalHistory }) => {
  return (
    <div className="medical-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="dashboard-section-title">Medical History</h3>
        <button className="text-xs px-2.5 py-1 text-medical-primary hover:bg-medical-accent hover:bg-opacity-50 rounded transition-colors">
          + Add Condition
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {medicalHistory.map((item) => (
          <div key={item.id} className="py-3 first:pt-0 last:pb-0">
            <div className="flex justify-between">
              <div className="medical-data-value">{item.condition}</div>
              <div className={`${
                item.status === 'active' 
                  ? 'medical-alert-warning' 
                  : 'medical-alert-normal'
              }`}>
                {item.status === 'active' ? 'Active' : 'Resolved'}
              </div>
            </div>
            {item.notes && (
              <div className="text-sm text-gray-600 mt-1">{item.notes}</div>
            )}
          </div>
        ))}

        {medicalHistory.length === 0 && (
          <div className="py-4 text-center text-gray-500 italic">
            No medical history recorded
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistoryCard;
