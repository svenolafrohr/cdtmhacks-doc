
import React from 'react';
import { Medication } from '@/data/mockData';

interface MedicationsCardProps {
  medications: Medication[];
}

const MedicationsCard: React.FC<MedicationsCardProps> = ({ medications }) => {
  const isCurrentMedication = (medication: Medication): boolean => {
    return medication.endDate === null || new Date(medication.endDate) > new Date();
  };

  const currentMedications = medications.filter(isCurrentMedication);
  const pastMedications = medications.filter(med => !isCurrentMedication(med));

  return (
    <div className="medical-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="dashboard-section-title">Medications</h3>
        <button className="text-xs px-2.5 py-1 text-medical-primary hover:bg-medical-accent hover:bg-opacity-50 rounded transition-colors">
          + Add Medication
        </button>
      </div>

      {currentMedications.length > 0 && (
        <>
          <div className="text-sm font-medium text-gray-700 mb-2">Current Medications</div>
          <div className="divide-y divide-gray-100 mb-4">
            {currentMedications.map((medication) => (
              <div key={medication.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex justify-between">
                  <div className="medical-data-value">{medication.name}</div>
                  <div className="medical-alert-normal">Active</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {medication.dosage} - {medication.frequency}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Started: {new Date(medication.startDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {pastMedications.length > 0 && (
        <>
          <div className="text-sm font-medium text-gray-700 mb-2">Past Medications</div>
          <div className="divide-y divide-gray-100">
            {pastMedications.map((medication) => (
              <div key={medication.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex justify-between">
                  <div className="medical-data-value">{medication.name}</div>
                  <div className="text-gray-500 text-xs">Completed</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {medication.dosage} - {medication.frequency}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(medication.startDate).toLocaleDateString()} - {' '}
                  {medication.endDate && new Date(medication.endDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {medications.length === 0 && (
        <div className="py-4 text-center text-gray-500 italic">
          No medications recorded
        </div>
      )}
    </div>
  );
};

export default MedicationsCard;
