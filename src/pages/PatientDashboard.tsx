import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { parseJsonbField } from '@/lib/utils';

// UI components
import { Search, Paperclip, ChevronDown, X, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

// Medical data display components
import EncounterSection from '@/components/medical/EncounterSection';
import MedicalHistorySection from '@/components/medical/MedicalHistorySection';
import DiagnosesSection from '@/components/medical/DiagnosesSection';
import MedicationsSection from '@/components/medical/MedicationsSection';
import AllergiesSection from '@/components/medical/AllergiesSection';
import FamilyHistorySection from '@/components/medical/FamilyHistorySection';
import SocialHistorySection from '@/components/medical/SocialHistorySection';
import ReviewOfSystemsSection from '@/components/medical/ReviewOfSystemsSection';
import VitalSignsSection from '@/components/medical/VitalSignsSection';
import LabResultsSection from '@/components/medical/LabResultsSection';
import ObservationsSection from '@/components/medical/ObservationsSection';
import WearableDataSection from '@/components/medical/WearableDataSection';
import ImmunizationsSection from '@/components/medical/ImmunizationsSection';
import ProceduresSection from '@/components/medical/ProceduresSection';
import PractitionersSection from '@/components/medical/PractitionersSection';
import ProgramEligibilitySection from '@/components/medical/ProgramEligibilitySection';
import OpenQuestionsSection from '@/components/medical/OpenQuestionsSection';
import AssessmentPlanSection from '@/components/medical/AssessmentPlanSection';

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patientRecord, setPatientRecord] = useState<any | null>(null);

  // Fetch patient record data from Supabase
  useEffect(() => {
    const fetchPatientRecord = async () => {
      try {
        setLoading(true);
        
        // Get the most recent patient record
        const { data, error } = await supabase
          .from('patient_record')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          setPatientRecord(data[0]);
          console.log('Patient record retrieved:', data[0]);
        } else {
          console.log('No patient records found');
          setError('No patient records found');
        }
      } catch (err: any) {
        console.error('Error fetching patient record:', err);
        setError(err.message || 'Failed to fetch patient data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatientRecord();
  }, []);
  
  // Parse JSON fields from the patient record
  const encounter = parseJsonbField(patientRecord?.encounter) || [];
  const prior_med_history = parseJsonbField(patientRecord?.prior_med_history) || [];
  const diagnoses = parseJsonbField(patientRecord?.diagnoses) || [];
  const medications = parseJsonbField(patientRecord?.medications) || [];
  const allergies = parseJsonbField(patientRecord?.allergies) || [];
  const family_history = parseJsonbField(patientRecord?.family_history) || [];
  const social_history = parseJsonbField(patientRecord?.social_history) || [];
  const review_of_systems = parseJsonbField(patientRecord?.review_of_systems) || [];
  const vital_signs = parseJsonbField(patientRecord?.vital_signs) || [];
  const labs = parseJsonbField(patientRecord?.labs) || [];
  const observations = parseJsonbField(patientRecord?.observations) || [];
  const wearable_observations = parseJsonbField(patientRecord?.wearable_observations) || null;
  const immunizations = parseJsonbField(patientRecord?.immunizations) || [];
  const procedures = parseJsonbField(patientRecord?.procedures) || [];
  const practitioners = parseJsonbField(patientRecord?.practitioners) || [];
  const program_eligibility = parseJsonbField(patientRecord?.program_eligibility) || {};
  const open_questions = parseJsonbField(patientRecord?.open_questions) || [];
  const assessment = parseJsonbField(patientRecord?.assessment) || { summary: "" };
  const plan = parseJsonbField(patientRecord?.plan) || { plan: "", next_appointment: "" };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading patient data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-xl text-red-600 mb-4">Error: {error}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-teal-800">GKV</h1>
        {patientRecord && (
          <div className="text-right">
            <h2 className="font-medium">{patientRecord.first_name} {patientRecord.last_name}</h2>
            <p className="text-sm text-gray-500">ID: {patientRecord.patient_id}</p>
          </div>
        )}
      </div>
      
      {/* Search bar */}
      <div className="relative">
        <div className="flex items-center border rounded-lg bg-white relative">
          <Search className="absolute left-3 text-gray-400 h-5 w-5" />
          <Input 
            className="pl-10 pr-10 py-6 border-0 focus-visible:ring-0" 
            placeholder="Vorlage suchen"
          />
          <ChevronDown className="absolute right-3 text-gray-400 h-5 w-5" />
        </div>
      </div>
      
      {/* Medical categories */}
      <Accordion type="multiple" className="space-y-4 mt-4" defaultValue={["encounter", "medical-history", "patient-context", "care-team"]}>
        {/* First section - Encounter & Diagnostics */}
        <AccordionItem value="encounter" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Encounter & Diagnostics</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <EncounterSection encounter={encounter} />
              <DiagnosesSection diagnoses={diagnoses} />
              <VitalSignsSection vitalSigns={vital_signs} />
              <ObservationsSection observations={observations} />
              <ReviewOfSystemsSection reviewOfSystems={review_of_systems} />
              <LabResultsSection labResults={labs} />
              <WearableDataSection wearableObservations={wearable_observations} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Second section - Medical History */}
        <AccordionItem value="medical-history" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Medical History</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <MedicalHistorySection medicalHistory={prior_med_history} />
              <AllergiesSection allergies={allergies} />
              <MedicationsSection medications={medications} />
              <ImmunizationsSection immunizations={immunizations} />
              <ProceduresSection procedures={procedures} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Third section - Patient Context */}
        <AccordionItem value="patient-context" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Patient Context</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <FamilyHistorySection familyHistory={family_history} />
              <SocialHistorySection socialHistory={social_history} />
              <ProgramEligibilitySection programEligibility={program_eligibility} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Fourth section - Care Team & Plan */}
        <AccordionItem value="care-team" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Care Team & Plan</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <PractitionersSection practitioners={practitioners} />
              <OpenQuestionsSection openQuestions={open_questions} />
              <AssessmentPlanSection 
                assessment={assessment} 
                plan={plan} 
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* New entry button */}
      <button className="flex items-center text-gray-500 mt-4 hover:text-gray-700">
        <span className="flex items-center justify-center w-6 h-6 border border-gray-400 rounded-full mr-2">+</span>
        Neuen Eintrag einfügen
      </button>
      
      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-white border-t">
        <div className="w-12 h-12 rounded-full bg-teal-700 flex items-center justify-center">
          <Mic className="text-white" />
        </div>
        
        <Button className="px-10 py-6 bg-white border border-teal-700 text-teal-700 hover:bg-teal-50">
          Speichern
        </Button>
      </div>
    </div>
  );
};

export default PatientDashboard;
