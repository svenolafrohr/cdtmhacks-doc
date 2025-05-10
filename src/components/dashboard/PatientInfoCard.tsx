
import React from 'react';
import { Patient } from '@/data/mockData';

interface PatientInfoCardProps {
  patient: Patient;
}

const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patient }) => {
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="medical-card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-medium text-gray-800">{patient.name}</h3>
        <div className="px-3 py-1 bg-medical-accent text-medical-primary text-xs font-medium rounded-full">
          Active Patient
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div>
          <div className="medical-data-label">Age</div>
          <div className="medical-data-value">{calculateAge(patient.dateOfBirth)} years</div>
        </div>

        <div>
          <div className="medical-data-label">Date of Birth</div>
          <div className="medical-data-value">
            {new Date(patient.dateOfBirth).toLocaleDateString()}
          </div>
        </div>

        <div>
          <div className="medical-data-label">Gender</div>
          <div className="medical-data-value capitalize">{patient.gender}</div>
        </div>

        <div>
          <div className="medical-data-label">Patient Since</div>
          <div className="medical-data-value">
            {new Date(patient.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="text-xs px-3 py-1.5 bg-medical-primary text-white rounded-md hover:bg-opacity-90 transition-colors">
          Edit Information
        </button>
        <button className="text-xs px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          Patient History
        </button>
      </div>
    </div>
  );
};

export default PatientInfoCard;
