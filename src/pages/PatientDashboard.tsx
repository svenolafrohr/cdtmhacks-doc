
import React, { useState } from 'react';
import { 
  patient, 
  visits, 
  vitals, 
  diagnoses, 
  medicalHistory, 
  medications,
  vitalsHistory
} from '@/data/mockData';

// Components
import PatientInfoCard from '@/components/dashboard/PatientInfoCard';
import VisitDetailsCard from '@/components/dashboard/VisitDetailsCard';
import DiagnosisCard from '@/components/dashboard/DiagnosisCard';
import MedicalHistoryCard from '@/components/dashboard/MedicalHistoryCard';
import MedicationsCard from '@/components/dashboard/MedicationsCard';
import VisitHistoryTimeline from '@/components/dashboard/VisitHistoryTimeline';
import VitalsChart from '@/components/dashboard/VitalsChart';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const PatientDashboard = () => {
  // Get the most recent visit as default selected visit
  const sortedVisits = [...visits].sort((a, b) => 
    new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );
  
  const [selectedVisitId, setSelectedVisitId] = useState(sortedVisits[0]?.id || '');
  const selectedVisit = visits.find(v => v.id === selectedVisitId);
  const selectedVisitVitals = vitals.find(v => v.visitId === selectedVisitId);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Patient Dashboard</h1>
        <p className="text-gray-500">
          View and manage patient information, vitals, and medical history.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content - left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <PatientInfoCard patient={patient} />

          {selectedVisit && (
            <>
              <VisitDetailsCard 
                visit={selectedVisit} 
                vitals={selectedVisitVitals} 
              />
              
              <DiagnosisCard 
                visit={selectedVisit} 
                diagnoses={diagnoses}
              />
              
              <div className="medical-card">
                <h3 className="dashboard-section-title mb-4">Vitals History</h3>
                
                <Tabs defaultValue="bloodPressure">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
                    <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
                    <TabsTrigger value="temperature">Temperature</TabsTrigger>
                  </TabsList>
                  <TabsContent value="bloodPressure">
                    <VitalsChart data={vitalsHistory} metric="bloodPressure" />
                  </TabsContent>
                  <TabsContent value="heartRate">
                    <VitalsChart data={vitalsHistory} metric="heartRate" />
                  </TabsContent>
                  <TabsContent value="temperature">
                    <VitalsChart data={vitalsHistory} metric="temperature" />
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </div>

        {/* Sidebar - right 1/3 */}
        <div className="space-y-6">
          <VisitHistoryTimeline 
            visits={visits} 
            selectedVisitId={selectedVisitId}
            onVisitSelect={setSelectedVisitId}
          />
          
          <MedicalHistoryCard medicalHistory={medicalHistory} />
          
          <MedicationsCard medications={medications} />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
