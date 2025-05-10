
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

// Sample medical data
const sampleMedicalData = {
  encounter: {
    visit_date: "2023-04-15T10:30:00Z",
    chief_complaint: "Persistent cough and fever",
    history_of_present_illness: "Patient reports a worsening cough over the past week accompanied by fever and fatigue. Symptoms began after exposure to a sick coworker."
  },
  prior_med_history: [
    {
      event_datetime: "2022-06-10T14:00:00Z",
      event_type: "Surgery",
      event_details: "Appendectomy - laparoscopic procedure without complications"
    },
    {
      event_datetime: "2021-02-20T09:15:00Z",
      event_type: "Hospitalization",
      event_details: "Pneumonia - treated with IV antibiotics for 3 days"
    }
  ],
  diagnoses: [
    {
      diagnosis_date: "2023-04-15T11:15:00Z",
      diagnosis_name: "Acute bronchitis",
      icd10_code: "J20.9",
      diagnosis_details: "Viral etiology suspected, chest x-ray negative for pneumonia"
    },
    {
      diagnosis_date: "2022-10-05T15:30:00Z",
      diagnosis_name: "Hypertension",
      icd10_code: "I10",
      diagnosis_details: "Essential (primary) hypertension, well-controlled with medication"
    }
  ],
  medications: [
    {
      name: "Lisinopril",
      dose: "10mg",
      amount_morning: 1,
      amount_noon: 0,
      amount_evening: 0,
      amount_night: 0,
      comment: "Take on empty stomach"
    },
    {
      name: "Azithromycin",
      dose: "250mg",
      amount_morning: 1,
      amount_noon: 0,
      amount_evening: 0,
      amount_night: 0,
      comment: "5-day course for bronchitis"
    }
  ],
  allergies: [
    {
      patient_id: "pat123",
      icd10_code: "Z88.0 (Penicillin)"
    },
    {
      patient_id: "pat123",
      icd10_code: "Z91.013 (Peanuts)"
    }
  ],
  family_history: [
    {
      relative_name: "Father",
      history: "Type 2 diabetes, diagnosed at age 45. Myocardial infarction at age 62."
    },
    {
      relative_name: "Mother",
      history: "Hypertension, breast cancer at age 51, in remission."
    }
  ],
  social_history: [
    {
      patient_id: "pat123",
      drinking: "Social drinker, 2-4 drinks per week",
      smoking: "Former smoker, quit 5 years ago",
      drugs: "Denies illicit drug use",
      marital_status: "Married",
      kids: 2,
      job: "Software Engineer"
    }
  ],
  review_of_systems: [
    {
      encounter_id: "enc123",
      system_name: "Respiratory",
      details: "Productive cough, no hemoptysis, mild dyspnea on exertion"
    },
    {
      encounter_id: "enc123",
      system_name: "Cardiovascular",
      details: "No chest pain, no palpitations, no edema"
    }
  ],
  vital_signs: {
    datetime: "2023-04-15T10:45:00Z",
    weight: 78,
    height: 175,
    bmi: 25.5
  },
  lab_results: [
    {
      datetime: "2023-04-15T11:30:00Z",
      analyte: "White Blood Cell Count",
      level: 12.5,
      unit: "K/µL",
      method: "Flow Cytometry",
      ref_range_lower: 4.5,
      ref_range_upper: 11.0,
      is_abnormal: true,
      lab_provider: {
        name: "City Medical Laboratory",
        address: "123 Main Street, Anytown"
      }
    },
    {
      datetime: "2023-04-15T11:30:00Z",
      analyte: "C-Reactive Protein",
      level: 15,
      unit: "mg/L",
      method: "Immunoturbidimetric",
      ref_range_lower: 0,
      ref_range_upper: 10,
      is_abnormal: true,
      lab_provider: {
        name: "City Medical Laboratory",
        address: "123 Main Street, Anytown"
      }
    }
  ],
  observations: [
    {
      encounter_id: "enc123",
      datetime: "2023-04-15T11:00:00Z",
      type: "Chest X-Ray",
      result: "No acute findings, mild bronchial wall thickening consistent with bronchitis"
    }
  ],
  wearable_observations: [
    {
      measurement_type: "blood_pressure",
      datetime: "2023-04-14T08:30:00Z",
      systolic: 132,
      diastolic: 85,
      is_abnormal: true
    },
    {
      measurement_type: "heart_rate",
      datetime: "2023-04-14T14:15:00Z",
      frequency: 82,
      is_abnormal: false
    },
    {
      measurement_type: "blood_glucose",
      datetime: "2023-04-14T07:00:00Z",
      analyte: "Glucose",
      level: 105,
      unit: "mg/dL",
      method: "CGM",
      ref_range_lower: 70,
      ref_range_upper: 100,
      is_abnormal: true
    }
  ],
  immunizations: [
    {
      patient_id: "pat123",
      date: "2022-10-15",
      disease: "Influenza",
      vaccine_name: "Fluzone Quadrivalent",
      batch_number: "FL4982",
      best_before: "2023-06-30",
      doctor_name: "Dr. Emily Johnson",
      doctor_address: {
        street: "456 Healthcare Blvd",
        city: "Cityville",
        zip: "12345"
      },
      details: "Annual vaccination"
    }
  ],
  procedures: [
    {
      patient_id: "pat123",
      type: "Spirometry",
      date: "2023-04-15",
      details: "FEV1/FVC: 0.78, within normal limits"
    }
  ],
  practitioners: [
    {
      last_name: "Johnson",
      first_name: "Emily",
      function: "Primary Care Physician"
    },
    {
      last_name: "Wong",
      first_name: "David",
      function: "Pulmonologist"
    }
  ],
  program_eligibility: {
    patient_id: "pat123",
    elig_hzv: true,
    elig_dmp_diabetes: false,
    elig_dmp_asthma: true,
    elig_dmp_copd: false,
    elig_dmp_khk: false,
    elig_dmp_obesity: false
  },
  open_questions: [
    {
      question_id: "q1",
      questions: "Should patient get allergy testing for seasonal allergies?"
    },
    {
      question_id: "q2",
      questions: "Follow up on previous cardiac stress test from last year"
    }
  ],
  assessment: {
    summary: "Patient presents with acute bronchitis, likely viral in origin. Hypertension remains well-controlled. Recent wearable data indicates slightly elevated blood glucose levels that should be monitored."
  },
  plan: {
    plan: "1. Complete 5-day course of azithromycin\n2. Increase fluid intake\n3. Rest and use humidifier at night\n4. Monitor blood glucose with home device\n5. Continue current hypertension medication",
    next_appointment: "2023-04-29T10:00:00Z"
  }
};

const PatientDashboard = () => {
  const sortedVisits = [...visits].sort((a, b) => 
    new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );
  
  const [selectedVisitId, setSelectedVisitId] = useState(sortedVisits[0]?.id || '');

  return (
    <div className="space-y-4 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-teal-800">GKV</h1>
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
      <Accordion type="multiple" className="space-y-4 mt-4">
        {/* First section - Main categories */}
        <AccordionItem value="main-categories" className="border-none">
          <div className="space-y-4">
            {/* Anamnese */}
            <CategorySection 
              letter="A" 
              bgColor="bg-amber-100" 
              textColor="text-amber-800"
              title="Anamnese"
              content="This is a string"
            >
              <></>
            </CategorySection>
            
            {/* Befund */}
            <CategorySection 
              letter="B" 
              bgColor="bg-amber-100" 
              textColor="text-amber-800"
              title="Befund"
              content="Also a string. (with attachments)"
              hasAttachment={true}
            >
              <></>
            </CategorySection>
            
            {/* Procedere */}
            <CategorySection 
              letter="P" 
              bgColor="bg-blue-100" 
              textColor="text-blue-800"
              title="Procedere"
              content="Another string"
            >
              <></>
            </CategorySection>
            
            {/* Folgetermin */}
            <CategorySection 
              letter="F" 
              bgColor="bg-teal-100" 
              textColor="text-teal-800"
              title="Folgetermin"
              content=""
              expandable={true}
            >
              <div className="bg-amber-50 text-gray-800 py-1 px-3 rounded-md inline-flex items-center mr-2 mb-2">
                Erkältung
                <X className="ml-2 h-4 w-4 text-gray-500" />
              </div>
            </CategorySection>
          </div>
        </AccordionItem>
        
        {/* Second section - Encounter & Diagnostics */}
        <AccordionItem value="encounter" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Encounter & Diagnostics</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <EncounterSection encounter={sampleMedicalData.encounter} />
              <DiagnosesSection diagnoses={sampleMedicalData.diagnoses} />
              <VitalSignsSection vitalSigns={sampleMedicalData.vital_signs} />
              <ObservationsSection observations={sampleMedicalData.observations} />
              <ReviewOfSystemsSection reviewOfSystems={sampleMedicalData.review_of_systems} />
              <LabResultsSection labResults={sampleMedicalData.lab_results} />
              <WearableDataSection wearableObservations={sampleMedicalData.wearable_observations} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Third section - Medical History */}
        <AccordionItem value="medical-history" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Medical History</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <MedicalHistorySection medicalHistory={sampleMedicalData.prior_med_history} />
              <AllergiesSection allergies={sampleMedicalData.allergies} />
              <MedicationsSection medications={sampleMedicalData.medications} />
              <ImmunizationsSection immunizations={sampleMedicalData.immunizations} />
              <ProceduresSection procedures={sampleMedicalData.procedures} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Fourth section - Patient Context */}
        <AccordionItem value="patient-context" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Patient Context</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <FamilyHistorySection familyHistory={sampleMedicalData.family_history} />
              <SocialHistorySection socialHistory={sampleMedicalData.social_history} />
              <ProgramEligibilitySection programEligibility={sampleMedicalData.program_eligibility} />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Fifth section - Care Team & Plan */}
        <AccordionItem value="care-team" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Care Team & Plan</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <PractitionersSection practitioners={sampleMedicalData.practitioners} />
              <OpenQuestionsSection openQuestions={sampleMedicalData.open_questions} />
              <AssessmentPlanSection 
                assessment={sampleMedicalData.assessment} 
                plan={sampleMedicalData.plan} 
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
      
      {/* Diagnosen section remains for compatibility */}
      <CategorySection 
        letter="D" 
        bgColor="bg-orange-100" 
        textColor="text-orange-800"
        title="Diagnosen"
        content=""
        expandable={true}
      >
        <div className="mt-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
            <Input 
              className="pl-10 py-2 bg-white" 
              placeholder="Diagnose suchen"
            />
          </div>
          
          <div className="mt-3 border-l-4 border-amber-300 pl-3 py-1 mb-3">
            <div className="flex justify-between">
              <div>
                <span className="font-bold">J30.1</span> Allergische Rhinopathie durch Pollen
              </div>
              <div className="flex items-center">
                <span className="text-green-700 font-bold mr-2">DD</span>
                <span className="text-gray-500 mr-2">Gesichert</span>
                <X className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
          
          <div className="border-l-4 border-amber-300 pl-3 py-1">
            <div className="flex justify-between">
              <div>
                <span className="font-bold">J06.9</span> Akute Infektion der oberen Atemwege, nicht näh...
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Gesichert</span>
                <X className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </CategorySection>
      
      {/* Leistung section remains for compatibility */}
      <CategorySection 
        letter="L" 
        bgColor="bg-purple-100" 
        textColor="text-purple-800"
        title="Leistung"
        content=""
        expandable={true}
      >
        <div className="mt-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
            <Input 
              className="pl-10 py-2 bg-white" 
              placeholder="Leistung suchen"
            />
          </div>
          
          <div className="mt-3 border-l-4 border-purple-200 pl-3 py-1">
            <div className="flex justify-between">
              <div>
                <span className="font-bold">03000</span> Versichertenpauschale
              </div>
              <X className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </CategorySection>
      
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

// Component for each category section
const CategorySection = ({ 
  letter, 
  bgColor, 
  textColor, 
  title, 
  content, 
  hasAttachment = false,
  expandable = false,
  children 
}) => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="flex">
        {/* Letter indicator */}
        <div className={`w-10 h-10 flex items-center justify-center text-lg font-bold ${bgColor} ${textColor}`}>
          {letter}
        </div>
        
        {/* Content area */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">{title}</h2>
            {expandable && (
              <button onClick={() => setExpanded(!expanded)}>
                <ChevronDown className={`h-5 w-5 text-gray-500 transform transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
          
          {content && (
            <div className="flex justify-between mt-1">
              <p className="text-gray-600">{content}</p>
              {hasAttachment && <Paperclip className="h-5 w-5 text-gray-500" />}
            </div>
          )}
          
          {expanded && children && (
            <div className="mt-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
