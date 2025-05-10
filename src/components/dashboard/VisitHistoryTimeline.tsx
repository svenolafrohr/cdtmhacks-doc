
import React from 'react';
import { Visit } from '@/data/mockData';

interface VisitHistoryTimelineProps {
  visits: Visit[];
  selectedVisitId: string;
  onVisitSelect: (visitId: string) => void;
}

const VisitHistoryTimeline: React.FC<VisitHistoryTimelineProps> = ({ 
  visits, 
  selectedVisitId,
  onVisitSelect 
}) => {
  // Sort visits by date (newest first)
  const sortedVisits = [...visits].sort((a, b) => 
    new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );

  return (
    <div className="medical-card">
      <h3 className="dashboard-section-title mb-4">Visit History</h3>
      
      <div className="space-y-3">
        {sortedVisits.map((visit) => {
          const isSelected = visit.id === selectedVisitId;
          const visitDate = new Date(visit.visitDate);
          
          return (
            <div
              key={visit.id}
              onClick={() => onVisitSelect(visit.id)}
              className={`cursor-pointer p-3 rounded-md border transition-all ${
                isSelected 
                  ? 'border-medical-primary bg-medical-accent' 
                  : 'border-gray-200 hover:border-medical-primary hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-800">
                  {visitDate.toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  {visitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className="text-sm text-gray-700 mt-1">
                {visit.reasonForVisit}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Dr. {visit.createdBy.split(' ')[1]}
              </div>
            </div>
          );
        })}
        
        {visits.length === 0 && (
          <div className="text-center text-gray-500 italic py-4">
            No visit history available
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitHistoryTimeline;
