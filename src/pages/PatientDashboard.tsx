
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { parseJsonbField } from '@/lib/utils';
import { Search, Paperclip, ChevronDown, X, Mic, ArrowLeft } from 'lucide-react';
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patientRecord, setPatientRecord] = useState<any | null>(null);

  // Fetch patient record data from Supabase
  useEffect(() => {
    const fetchPatientRecord = async () => {
      try {
        setLoading(true);
        
        if (!id) {
          // If no id provided, fetch the most recent record (for backward compatibility)
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
            console.log('Most recent patient record retrieved:', data[0]);
          } else {
            console.log('No patient records found');
            setError('No patient records found');
          }
        } else {
          // Fetch specific patient record by ID
          const { data, error } = await supabase
            .from('patient_record')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) {
            throw error;
          }
          
          if (data) {
            setPatientRecord(data);
            console.log('Patient record retrieved:', data);
          } else {
            console.log('No patient record found with ID:', id);
            setError(`No patient record found with ID: ${id}`);
          }
        }
      } catch (err: any) {
        console.error('Error fetching patient record:', err);
        setError(err.message || 'Failed to fetch patient data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatientRecord();
  }, [id]);
  
  // Define default values for each data type to satisfy TypeScript
  const defaultEncounter = {
    visit_date: '',
    chief_complaint: '',
    history_of_present_illness: ''
  };
  
  const defaultVitalSigns = {
    datetime: '',
    weight: 0,
    height: 0,
    bmi: 0
  };
  
  const defaultProgramEligibility = {
    patient_id: '',
    elig_hzv: false,
    elig_dmp_diabetes: false,
    elig_dmp_asthma: false,
    elig_dmp_copd: false,
    elig_dmp_khk: false,
    elig_dmp_obesity: false
  };
  
  const defaultAssessment = {
    summary: ''
  };
  
  const defaultPlan = {
    plan: '',
    next_appointment: ''
  };
  
  // Parse JSON fields from the patient record with proper defaults
  const encounter = parseJsonbField<typeof defaultEncounter>(patientRecord?.encounter) || defaultEncounter;
  const prior_med_history = parseJsonbField<Array<{
    event_datetime: string;
    event_type: string;
    event_details: string;
  }>>(patientRecord?.prior_med_history) || [];
  
  const diagnoses = parseJsonbField<Array<{
    diagnosis_date: string;
    diagnosis_name: string;
    icd10_code: string;
    diagnosis_details: string;
  }>>(patientRecord?.diagnoses) || [];
  
  const medications = parseJsonbField<Array<{
    name: string;
    dose: string;
    amount_morning: number;
    amount_noon: number;
    amount_evening: number;
    amount_night: number;
    comment: string;
  }>>(patientRecord?.medications) || [];
  
  const allergies = parseJsonbField<any[]>(patientRecord?.allergies) || [];
  
  const family_history = parseJsonbField<Array<{
    relative_name: string;
    history: string;
  }>>(patientRecord?.family_history) || [];
  
  const social_history = parseJsonbField<Array<{
    patient_id: string;
    drinking: string;
    smoking: string;
    drugs: string;
    marital_status: string;
    kids: number;
    job: string;
  }>>(patientRecord?.social_history) || [];
  
  const review_of_systems = parseJsonbField<Array<{
    encounter_id: string;
    system_name: string;
    details: string;
  }>>(patientRecord?.review_of_systems) || [];
  
  const vital_signs = parseJsonbField<typeof defaultVitalSigns>(patientRecord?.vital_signs) || defaultVitalSigns;
  
  const labs = parseJsonbField<Array<{
    datetime: string;
    analyte: string;
    level: number;
    unit: string;
    method: string;
    ref_range_lower: number;
    ref_range_upper: number;
    is_abnormal: boolean;
    lab_provider: {
      name: string;
      address: string;
    };
  }>>(patientRecord?.labs) || [];
  
  const observations = parseJsonbField<Array<{
    encounter_id: string;
    datetime: string;
    type: string;
    result: string;
  }>>(patientRecord?.observations) || [];
  
  const wearable_observations = parseJsonbField<{
    samples?: Array<{
      date: string;
      type: string;
      unit: string;
      value: number;
      device: string;
      source: string;
      metadata?: {
        HKMetadataKeyHeartRateMotionContext?: number;
      };
    }>;
  }>(patientRecord?.wearable_observations) || { samples: [] };
  
  const immunizations = parseJsonbField<Array<{
    patient_id: string;
    date: string;
    disease: string;
    vaccine_name: string;
    batch_number: string;
    best_before: string;
    doctor_name: string;
    doctor_address: any;
    details: string;
  }>>(patientRecord?.immunizations) || [];
  
  const procedures = parseJsonbField<Array<{
    patient_id: string;
    type: string;
    date: string;
    details: string;
  }>>(patientRecord?.procedures) || [];
  
  const practitioners = parseJsonbField<Array<{
    last_name: string;
    first_name: string;
    function: string;
  }>>(patientRecord?.practitioners) || [];
  
  const program_eligibility = parseJsonbField<typeof defaultProgramEligibility>(patientRecord?.program_eligibility) || defaultProgramEligibility;
  
  const open_questions = parseJsonbField<Array<{
    question_id: string;
    questions: string;
  }>>(patientRecord?.open_questions) || [];
  
  const assessment = parseJsonbField<typeof defaultAssessment>(patientRecord?.assessment) || defaultAssessment;
  const plan = parseJsonbField<typeof defaultPlan>(patientRecord?.plan) || defaultPlan;

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
        <div className="flex gap-3">
          <Button onClick={() => navigate('/patients')}>Back to Patient List</Button>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/patients')}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Zurück
        </Button>
        <div className="flex-1 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-teal-800">GKV</h1>
          {patientRecord && (
            <div className="text-right">
              <h2 className="font-medium">{patientRecord.first_name} {patientRecord.last_name}</h2>
              <p className="text-sm text-gray-500">ID: {patientRecord.patient_id}</p>
            </div>
          )}
        </div>
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
      
      {/* Medical categories - reorganized according to request */}
      <Accordion type="multiple" className="space-y-4 mt-4" defaultValue={["anamnesis", "testing", "medication", "diagnoses", "patient-context", "open-questions", "assessment-plan"]}>
        {/* Anamnesis Section */}
        <AccordionItem value="anamnesis" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Anamnese</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <EncounterSection encounter={encounter} />
              <AllergiesSection allergies={allergies} />
              <FamilyHistorySection familyHistory={family_history} />
              <SocialHistorySection socialHistory={social_history} />
              <ReviewOfSystemsSection reviewOfSystems={review_of_systems} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Testing Section */}
        <AccordionItem value="testing" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Vorbefunde</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <VitalSignsSection vitalSigns={vital_signs} />
              <LabResultsSection labResults={labs} />
              <ObservationsSection observations={observations} />
              <ProceduresSection procedures={procedures} />
              <WearableDataSection wearableObservations={wearable_observations} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Medication Section */}
        <AccordionItem value="medication" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Dauermedikation</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <MedicationsSection medications={medications} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Diagnoses Section */}
        <AccordionItem value="diagnoses" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Diagnosen</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <DiagnosesSection diagnoses={diagnoses} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Patient Context Section */}
        <AccordionItem value="patient-context" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Organisatorisches</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <ImmunizationsSection immunizations={immunizations} />
              <ProgramEligibilitySection programEligibility={program_eligibility} />
              <PractitionersSection practitioners={practitioners} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Open Questions Section */}
        <AccordionItem value="open-questions" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Offene Fragen</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <OpenQuestionsSection openQuestions={open_questions} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Assessment & Plan Section */}
        <AccordionItem value="assessment-plan" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Procedere</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
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
          Importieren
        </Button>
      </div>
    </div>
  );
};

export default PatientDashboard;
