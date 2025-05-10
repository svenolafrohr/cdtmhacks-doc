
import React, { useState } from 'react';
import { Visit, Vitals } from '@/data/mockData';

interface VisitDetailsCardProps {
  visit: Visit;
  vitals?: Vitals;
}

const VisitDetailsCard: React.FC<VisitDetailsCardProps> = ({ visit, vitals }) => {
  const [notes, setNotes] = useState(visit.notes);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditNotes = () => {
    setIsEditing(true);
  };

  const handleSaveNotes = () => {
    setIsEditing(false);
    // Here we would typically save to the database
    console.log("Notes saved:", notes);
  };

  const getBPStatus = (bp: string) => {
    const [systolic, diastolic] = bp.split('/').map(Number);
    if (systolic >= 140 || diastolic >= 90) return 'medical-alert-critical';
    if (systolic >= 130 || diastolic >= 80) return 'medical-alert-warning';
    return 'medical-alert-normal';
  };

  const getTempStatus = (temp: number) => {
    if (temp >= 100.4) return 'medical-alert-critical';
    if (temp >= 99.5) return 'medical-alert-warning';
    return 'medical-alert-normal';
  };

  const getHeartRateStatus = (hr: number) => {
    if (hr >= 100 || hr <= 60) return 'medical-alert-warning';
    return 'medical-alert-normal';
  };

  const getRespRateStatus = (rr: number) => {
    if (rr >= 20 || rr <= 12) return 'medical-alert-warning';
    return 'medical-alert-normal';
  };

  return (
    <div className="medical-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="dashboard-section-title">Visit Details</h3>
        <div className="text-sm text-gray-500">
          {new Date(visit.visitDate).toLocaleString()}
        </div>
      </div>

      <div className="mb-4">
        <div className="medical-data-label">Reason for Visit</div>
        <div className="medical-data-value">{visit.reasonForVisit}</div>
      </div>

      {vitals && (
        <div className="mb-4">
          <div className="medical-data-label mb-2">Vitals</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4">
            <div>
              <div className="text-xs text-gray-500">Blood Pressure</div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{vitals.bloodPressure}</span>
                <span className={getBPStatus(vitals.bloodPressure)}>
                  {Number(vitals.bloodPressure.split('/')[0]) >= 130 ? 'High' : 'Normal'}
                </span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Heart Rate</div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{vitals.heartRate} bpm</span>
                <span className={getHeartRateStatus(vitals.heartRate)}>
                  {vitals.heartRate >= 100 ? 'Elevated' : 
                   vitals.heartRate <= 60 ? 'Low' : 'Normal'}
                </span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Temperature</div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{vitals.temperature}°F</span>
                <span className={getTempStatus(vitals.temperature)}>
                  {vitals.temperature >= 100.4 ? 'Fever' : 
                   vitals.temperature >= 99.5 ? 'Elevated' : 'Normal'}
                </span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Respiratory Rate</div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{vitals.respiratoryRate} br/min</span>
                <span className={getRespRateStatus(vitals.respiratoryRate)}>
                  {vitals.respiratoryRate >= 20 ? 'Elevated' : 
                   vitals.respiratoryRate <= 12 ? 'Low' : 'Normal'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="medical-data-label">Notes</div>
          {!isEditing ? (
            <button 
              onClick={handleEditNotes}
              className="text-xs px-2 py-0.5 text-medical-primary hover:underline"
            >
              Edit
            </button>
          ) : (
            <button 
              onClick={handleSaveNotes}
              className="text-xs px-2 py-0.5 bg-medical-primary text-white rounded"
            >
              Save
            </button>
          )}
        </div>

        {isEditing ? (
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            rows={4}
          />
        ) : (
          <div className="text-sm text-gray-700 p-2 bg-gray-50 rounded-md">
            {notes}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        Created by: {visit.createdBy}
      </div>
    </div>
  );
};

export default VisitDetailsCard;
