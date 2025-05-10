
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
import { Search, Paperclip, ChevronDown, X, Mic, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';

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
  const [medicalData, setMedicalData] = useState(sampleMedicalData);
  
  // Function to update nested fields in the medical data
  const updateMedicalData = (path, value) => {
    const newData = JSON.parse(JSON.stringify(medicalData));
    
    // Navigate to the nested path
    const pathArray = path.split('.');
    let current = newData;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }
    
    current[pathArray[pathArray.length - 1]] = value;
    setMedicalData(newData);
  };

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
      <Accordion type="multiple" className="space-y-4 mt-4" defaultValue={["encounter", "medical-history", "patient-context", "care-team"]}>
        {/* First section - Encounter & Diagnostics */}
        <AccordionItem value="encounter" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <span className="text-lg font-medium">Encounter & Diagnostics</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <div className="space-y-6">
              <EditableEncounterSection 
                encounter={medicalData.encounter} 
                onChange={(field, value) => updateMedicalData(`encounter.${field}`, value)} 
              />
              <EditableDiagnosesSection 
                diagnoses={medicalData.diagnoses} 
                onChange={(index, field, value) => {
                  const newDiagnoses = [...medicalData.diagnoses];
                  newDiagnoses[index][field] = value;
                  updateMedicalData('diagnoses', newDiagnoses);
                }}
              />
              <EditableVitalSignsSection 
                vitalSigns={medicalData.vital_signs} 
                onChange={(field, value) => updateMedicalData(`vital_signs.${field}`, value)}
              />
              <EditableObservationsSection 
                observations={medicalData.observations}
                onChange={(index, field, value) => {
                  const newObservations = [...medicalData.observations];
                  newObservations[index][field] = value;
                  updateMedicalData('observations', newObservations);
                }}
              />
              <EditableReviewOfSystemsSection 
                reviewOfSystems={medicalData.review_of_systems}
                onChange={(index, field, value) => {
                  const newReviewSystems = [...medicalData.review_of_systems];
                  newReviewSystems[index][field] = value;
                  updateMedicalData('review_of_systems', newReviewSystems);
                }}
              />
              <EditableLabResultsSection 
                labResults={medicalData.lab_results}
                onChange={(index, field, value) => {
                  const newLabResults = [...medicalData.lab_results];
                  if (field.includes('.')) {
                    const [mainField, subField] = field.split('.');
                    newLabResults[index][mainField][subField] = value;
                  } else {
                    newLabResults[index][field] = value;
                  }
                  updateMedicalData('lab_results', newLabResults);
                }}
              />
              <EditableWearableDataSection 
                wearableObservations={medicalData.wearable_observations}
                onChange={(index, field, value) => {
                  const newWearableData = [...medicalData.wearable_observations];
                  newWearableData[index][field] = value;
                  updateMedicalData('wearable_observations', newWearableData);
                }}
              />
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
              <EditableMedicalHistorySection 
                medicalHistory={medicalData.prior_med_history}
                onChange={(index, field, value) => {
                  const newHistory = [...medicalData.prior_med_history];
                  newHistory[index][field] = value;
                  updateMedicalData('prior_med_history', newHistory);
                }}
              />
              <EditableAllergiesSection 
                allergies={medicalData.allergies}
                onChange={(index, field, value) => {
                  const newAllergies = [...medicalData.allergies];
                  newAllergies[index][field] = value;
                  updateMedicalData('allergies', newAllergies);
                }}
              />
              <EditableMedicationsSection 
                medications={medicalData.medications}
                onChange={(index, field, value) => {
                  const newMedications = [...medicalData.medications];
                  newMedications[index][field] = value;
                  updateMedicalData('medications', newMedications);
                }}
              />
              <EditableImmunizationsSection 
                immunizations={medicalData.immunizations}
                onChange={(index, field, value) => {
                  const newImmunizations = [...medicalData.immunizations];
                  if (field.includes('.')) {
                    const [mainField, subField] = field.split('.');
                    newImmunizations[index][mainField][subField] = value;
                  } else {
                    newImmunizations[index][field] = value;
                  }
                  updateMedicalData('immunizations', newImmunizations);
                }}
              />
              <EditableProceduresSection 
                procedures={medicalData.procedures}
                onChange={(index, field, value) => {
                  const newProcedures = [...medicalData.procedures];
                  newProcedures[index][field] = value;
                  updateMedicalData('procedures', newProcedures);
                }}
              />
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
              <EditableFamilyHistorySection 
                familyHistory={medicalData.family_history}
                onChange={(index, field, value) => {
                  const newFamilyHistory = [...medicalData.family_history];
                  newFamilyHistory[index][field] = value;
                  updateMedicalData('family_history', newFamilyHistory);
                }}
              />
              <EditableSocialHistorySection 
                socialHistory={medicalData.social_history}
                onChange={(index, field, value) => {
                  const newSocialHistory = [...medicalData.social_history];
                  newSocialHistory[index][field] = value;
                  updateMedicalData('social_history', newSocialHistory);
                }}
              />
              <EditableProgramEligibilitySection 
                programEligibility={medicalData.program_eligibility}
                onChange={(field, value) => updateMedicalData(`program_eligibility.${field}`, value)}
              />
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
              <EditablePractitionersSection 
                practitioners={medicalData.practitioners}
                onChange={(index, field, value) => {
                  const newPractitioners = [...medicalData.practitioners];
                  newPractitioners[index][field] = value;
                  updateMedicalData('practitioners', newPractitioners);
                }}
              />
              <EditableOpenQuestionsSection 
                openQuestions={medicalData.open_questions}
                onChange={(index, field, value) => {
                  const newQuestions = [...medicalData.open_questions];
                  newQuestions[index][field] = value;
                  updateMedicalData('open_questions', newQuestions);
                }}
              />
              <EditableAssessmentPlanSection 
                assessment={medicalData.assessment} 
                plan={medicalData.plan}
                onAssessmentChange={(field, value) => updateMedicalData(`assessment.${field}`, value)}
                onPlanChange={(field, value) => updateMedicalData(`plan.${field}`, value)} 
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

// Create editable versions of each component
const EditableEncounterSection = ({ encounter, onChange }) => {
  if (!encounter) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Encounter Details</h3>
          <span className="text-sm text-gray-500">
            {encounter.visit_date ? formatDate(encounter.visit_date) : 'Date not available'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Chief Complaint</h4>
            <Input
              value={encounter.chief_complaint || ''}
              onChange={(e) => onChange('chief_complaint', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">History of Present Illness</h4>
            <Textarea
              value={encounter.history_of_present_illness || ''}
              onChange={(e) => onChange('history_of_present_illness', e.target.value)}
              className="w-full"
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const EditableMedicalHistorySection = ({ medicalHistory, onChange }) => {
  if (!medicalHistory || medicalHistory.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Medical History</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {medicalHistory.map((item, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between mb-1">
                <Input
                  value={item.event_type || ''}
                  onChange={(e) => onChange(index, 'event_type', e.target.value)}
                  className="font-medium w-1/2 mb-2"
                />
                <Input
                  type="datetime-local"
                  value={item.event_datetime ? new Date(item.event_datetime).toISOString().slice(0, 16) : ''}
                  onChange={(e) => onChange(index, 'event_datetime', new Date(e.target.value).toISOString())}
                  className="text-sm w-1/2 mb-2"
                />
              </div>
              <Textarea
                value={item.event_details || ''}
                onChange={(e) => onChange(index, 'event_details', e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditableDiagnosesSection = ({ diagnoses, onChange }) => {
  if (!diagnoses || diagnoses.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Diagnoses</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {diagnoses.map((diagnosis, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div className="w-3/4 flex gap-2">
                  <Input
                    value={diagnosis.diagnosis_name || ''}
                    onChange={(e) => onChange(index, 'diagnosis_name', e.target.value)}
                    className="font-medium w-2/3"
                  />
                  <Input
                    value={diagnosis.icd10_code || ''}
                    onChange={(e) => onChange(index, 'icd10_code', e.target.value)}
                    className="w-1/3"
                    placeholder="ICD-10 Code"
                  />
                </div>
                <Input
                  type="datetime-local"
                  value={diagnosis.diagnosis_date ? new Date(diagnosis.diagnosis_date).toISOString().slice(0, 16) : ''}
                  onChange={(e) => onChange(index, 'diagnosis_date', new Date(e.target.value).toISOString())}
                  className="text-sm w-1/4"
                />
              </div>
              <Textarea
                value={diagnosis.diagnosis_details || ''}
                onChange={(e) => onChange(index, 'diagnosis_details', e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Create the remaining editable components for each section
const EditableAllergiesSection = ({ allergies, onChange }) => {
  if (!allergies || allergies.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Allergies</h3>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {allergies.map((allergy, index) => (
            <div 
              key={index} 
              className="bg-red-50 text-red-700 text-sm px-3 py-1 rounded-full flex items-center gap-2"
            >
              <Input
                value={allergy.icd10_code || ''}
                onChange={(e) => onChange(index, 'icd10_code', e.target.value)}
                className="bg-transparent border-none p-0 w-auto focus-visible:ring-0"
              />
              <button 
                className="ml-1 text-red-500 hover:text-red-700"
                onClick={() => {
                  // Remove allergy logic would go here
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Define the other editable components following the same pattern
const EditableMedicationsSection = ({ medications, onChange }) => {
  // Implementation similar to other editable components
  if (!medications || medications.length === 0) return null;
  
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Medications</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {medications.map((medication, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex gap-2 mb-2">
                <Input
                  value={medication.name || ''}
                  onChange={(e) => onChange(index, 'name', e.target.value)}
                  className="font-medium w-2/3"
                  placeholder="Medication name"
                />
                <Input
                  value={medication.dose || ''}
                  onChange={(e) => onChange(index, 'dose', e.target.value)}
                  className="w-1/3"
                  placeholder="Dose"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-2">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Morning</label>
                  <Input
                    type="number"
                    value={medication.amount_morning || 0}
                    onChange={(e) => onChange(index, 'amount_morning', parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Noon</label>
                  <Input
                    type="number"
                    value={medication.amount_noon || 0}
                    onChange={(e) => onChange(index, 'amount_noon', parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Evening</label>
                  <Input
                    type="number"
                    value={medication.amount_evening || 0}
                    onChange={(e) => onChange(index, 'amount_evening', parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Night</label>
                  <Input
                    type="number"
                    value={medication.amount_night || 0}
                    onChange={(e) => onChange(index, 'amount_night', parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </div>
              </div>
              
              <Textarea
                value={medication.comment || ''}
                onChange={(e) => onChange(index, 'comment', e.target.value)}
                className="w-full"
                placeholder="Comments"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditableFamilyHistorySection = ({ familyHistory, onChange }) => {
  if (!familyHistory || familyHistory.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Family History</h3>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {familyHistory.map((item, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <Input
                value={item.relative_name || ''}
                onChange={(e) => onChange(index, 'relative_name', e.target.value)}
                className="font-medium mb-2"
                placeholder="Relation"
              />
              <Textarea
                value={item.history || ''}
                onChange={(e) => onChange(index, 'history', e.target.value)}
                className="w-full"
                placeholder="Medical history"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditableSocialHistorySection = ({ socialHistory, onChange }) => {
  if (!socialHistory || socialHistory.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Social History</h3>
      </div>
      <div className="p-4">
        {socialHistory.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-500 block mb-1">Marital Status</label>
              <Input
                value={item.marital_status || ''}
                onChange={(e) => onChange(index, 'marital_status', e.target.value)}
                className="mb-4"
              />
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-500 block mb-1">Job</label>
              <Input
                value={item.job || ''}
                onChange={(e) => onChange(index, 'job', e.target.value)}
                className="mb-4"
              />
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-500 block mb-1">Children</label>
              <Input
                type="number"
                value={item.kids || 0}
                onChange={(e) => onChange(index, 'kids', parseInt(e.target.value) || 0)}
                min={0}
                className="mb-4"
              />
            </div>
            
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-500 block mb-1">Drinking Habits</label>
              <Input
                value={item.drinking || ''}
                onChange={(e) => onChange(index, 'drinking', e.target.value)}
                className="mb-4"
              />
            </div>
            
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-500 block mb-1">Smoking Habits</label>
              <Input
                value={item.smoking || ''}
                onChange={(e) => onChange(index, 'smoking', e.target.value)}
                className="mb-4"
              />
            </div>
            
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-500 block mb-1">Drug Usage</label>
              <Input
                value={item.drugs || ''}
                onChange={(e) => onChange(index, 'drugs', e.target.value)}
                className="mb-4"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EditableReviewOfSystemsSection = ({ reviewOfSystems, onChange }) => {
  if (!reviewOfSystems || reviewOfSystems.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Review of Systems</h3>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {reviewOfSystems.map((item, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <Input
                value={item.system_name || ''}
                onChange={(e) => onChange(index, 'system_name', e.target.value)}
                className="font-medium mb-2"
                placeholder="System name"
              />
              <Textarea
                value={item.details || ''}
                onChange={(e) => onChange(index, 'details', e.target.value)}
                className="w-full"
                placeholder="Details"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditableVitalSignsSection = ({ vitalSigns, onChange }) => {
  if (!vitalSigns) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Vital Signs</h3>
          <Input
            type="datetime-local"
            value={vitalSigns.datetime ? new Date(vitalSigns.datetime).toISOString().slice(0, 16) : ''}
            onChange={(e) => onChange('datetime', new Date(e.target.value).toISOString())}
            className="text-sm w-auto"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Height (cm)</h4>
            <Input
              type="number"
              value={vitalSigns.height || ''}
              onChange={(e) => onChange('height', parseFloat(e.target.value) || 0)}
              min={0}
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Weight (kg)</h4>
            <Input
              type="number"
              value={vitalSigns.weight || ''}
              onChange={(e) => onChange('weight', parseFloat(e.target.value) || 0)}
              min={0}
              step={0.1}
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">BMI</h4>
            <Input
              type="number"
              value={vitalSigns.bmi || ''}
              onChange={(e) => onChange('bmi', parseFloat(e.target.value) || 0)}
              min={0}
              step={0.1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const EditableObservationsSection = ({ observations, onChange }) => {
  if (!observations || observations.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Observations</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {observations.map((observation, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <Input
                  value={observation.type || ''}
                  onChange={(e) => onChange(index, 'type', e.target.value)}
                  className="font-medium w-1/2"
                  placeholder="Type"
                />
                <Input
                  type="datetime-local"
                  value={observation.datetime ? new Date(observation.datetime).toISOString().slice(0, 16) : ''}
                  onChange={(e) => onChange(index, 'datetime', new Date(e.target.value).toISOString())}
                  className="text-sm w-1/2"
                />
              </div>
              <Textarea
                value={observation.result || ''}
                onChange={(e) => onChange(index, 'result', e.target.value)}
                className="w-full"
                placeholder="Result"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditableLabResultsSection = ({ labResults, onChange }) => {
  if (!labResults || labResults.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Lab Results</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {labResults.map((lab, index) => (
            <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <Input
                  value={lab.analyte || ''}
                  onChange={(e) => onChange(index, 'analyte', e.target.value)}
                  className="font-medium w-1/2 mr-2"
                  placeholder="Analyte"
                />
                <Input
                  type="datetime-local"
                  value={lab.datetime ? new Date(lab.datetime).toISOString().slice(0, 16) : ''}
                  onChange={(e) => onChange(index, 'datetime', new Date(e.target.value).toISOString())}
                  className="text-sm w-1/2"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Value</label>
                  <Input
                    type="number"
                    value={lab.level || ''}
                    onChange={(e) => onChange(index, 'level', parseFloat(e.target.value) || 0)}
                    step={0.01}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Unit</label>
                  <Input
                    value={lab.unit || ''}
                    onChange={(e) => onChange(index, 'unit', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Method</label>
                  <Input
                    value={lab.method || ''}
                    onChange={(e) => onChange(index, 'method', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Lower Ref</label>
                  <Input
                    type="number"
                    value={lab.ref_range_lower || ''}
                    onChange={(e) => onChange(index, 'ref_range_lower', parseFloat(e.target.value) || 0)}
                    step={0.01}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Upper Ref</label>
                  <Input
                    type="number"
                    value={lab.ref_range_upper || ''}
                    onChange={(e) => onChange(index, 'ref_range_upper', parseFloat(e.target.value) || 0)}
                    step={0.01}
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center h-10 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={lab.is_abnormal || false} 
                      onChange={(e) => onChange(index, 'is_abnormal', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Abnormal</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="text-xs text-gray-500 block mb-1">Lab Provider</label>
                <Input
                  value={lab.lab_provider?.name || ''}
                  onChange={(e) => onChange(index, 'lab_provider.name', e.target.value)}
                  className="mb-2"
                  placeholder="Name"
                />
                <Input
                  value={lab.lab_provider?.address || ''}
                  onChange={(e) => onChange(index, 'lab_provider.address', e.target.value)}
                  placeholder="Address"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditableWearableDataSection = ({ wearableObservations, onChange }) => {
  if (!wearableObservations || wearableObservations.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Wearable Data</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {wearableObservations.map((observation, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <Input
                  value={observation.measurement_type || ''}
                  onChange={(e) => onChange(index, 'measurement_type', e.target.value)}
                  className="font-medium w-1/2 mr-2"
                  placeholder="Measurement type"
                />
                <Input
                  type="datetime-local"
                  value={observation.datetime ? new Date(observation.datetime).toISOString().slice(0, 16) : ''}
                  onChange={(e) => onChange(index, 'datetime', new Date(e.target.value).toISOString())}
                  className="text-sm w-1/2"
                />
              </div>
              
              {observation.measurement_type === 'blood_pressure' && (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Systolic</label>
                    <Input
                      type="number"
                      value={observation.systolic || ''}
                      onChange={(e) => onChange(index, 'systolic', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Diastolic</label>
                    <Input
                      type="number"
                      value={observation.diastolic || ''}
                      onChange={(e) => onChange(index, 'diastolic', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              )}
              
              {observation.measurement_type === 'heart_rate' && (
                <div className="mb-2">
                  <label className="text-xs text-gray-500 block mb-1">Heart Rate</label>
                  <Input
                    type="number"
                    value={observation.frequency || ''}
                    onChange={(e) => onChange(index, 'frequency', parseInt(e.target.value) || 0)}
                  />
                </div>
              )}
              
              {observation.measurement_type === 'blood_glucose' && (
                <div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Value</label>
                      <Input
                        type="number"
                        value={observation.level || ''}
                        onChange={(e) => onChange(index, 'level', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Unit</label>
                      <Input
                        value={observation.unit || ''}
                        onChange={(e) => onChange(index, 'unit', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Method</label>
                      <Input
                        value={observation.method || ''}
                        onChange={(e) => onChange(index, 'method', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Lower Range</label>
                      <Input
                        type="number"
                        value={observation.ref_range_lower || ''}
                        onChange={(e) => onChange(index, 'ref_range_lower', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Upper Range</label>
                      <Input
                        type="number"
                        value={observation.ref_range_upper || ''}
                        onChange={(e) => onChange(index, 'ref_range_upper', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  checked={observation.is_abnormal || false} 
                  onChange={(e) => onChange(index, 'is_abnormal', e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm">Mark as abnormal</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditableImmunizationsSection = ({ immunizations, onChange }) => {
  if (!immunizations || immunizations.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Immunizations</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {immunizations.map((immunization, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <Input
                  value={immunization.disease || ''}
                  onChange={(e) => onChange(index, 'disease', e.target.value)}
                  className="font-medium w-1/2 mr-2"
                  placeholder="Disease"
                />
                <Input
                  type="date"
                  value={immunization.date || ''}
                  onChange={(e) => onChange(index, 'date', e.target.value)}
                  className="text-sm w-1/2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Input
                  value={immunization.vaccine_name || ''}
                  onChange={(e) => onChange(index, 'vaccine_name', e.target.value)}
                  placeholder="Vaccine name"
                />
                <Input
                  value={immunization.batch_number || ''}
                  onChange={(e) => onChange(index, 'batch_number', e.target.value)}
                  placeholder="Batch number"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Best before</label>
                  <Input
                    type="date"
                    value={immunization.best_before || ''}
                    onChange={(e) => onChange(index, 'best_before', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Doctor</label>
                  <Input
                    value={immunization.doctor_name || ''}
                    onChange={(e) => onChange(index, 'doctor_name', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs text-gray-500 block mb-1">Details</label>
                <Textarea
                  value={immunization.details || ''}
                  onChange={(e) => onChange(index, 'details', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditableProceduresSection = ({ procedures, onChange }) => {
  if (!procedures || procedures.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Procedures</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {procedures.map((procedure, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <Input
                  value={procedure.type || ''}
                  onChange={(e) => onChange(index, 'type', e.target.value)}
                  className="font-medium w-1/2 mr-2"
                  placeholder="Type"
                />
                <Input
                  type="date"
                  value={procedure.date || ''}
                  onChange={(e) => onChange(index, 'date', e.target.value)}
                  className="text-sm w-1/2"
                />
              </div>
              <Textarea
                value={procedure.details || ''}
                onChange={(e) => onChange(index, 'details', e.target.value)}
                className="w-full"
                placeholder="Details"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditablePractitionersSection = ({ practitioners, onChange }) => {
  if (!practitioners || practitioners.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Care Team</h3>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {practitioners.map((practitioner, index) => (
            <div key={index} className="pb-2 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Input
                  value={practitioner.first_name || ''}
                  onChange={(e) => onChange(index, 'first_name', e.target.value)}
                  placeholder="First name"
                />
                <Input
                  value={practitioner.last_name || ''}
                  onChange={(e) => onChange(index, 'last_name', e.target.value)}
                  placeholder="Last name"
                />
              </div>
              <Input
                value={practitioner.function || ''}
                onChange={(e) => onChange(index, 'function', e.target.value)}
                placeholder="Function"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditableProgramEligibilitySection = ({ programEligibility, onChange }) => {
  if (!programEligibility) return null;

  const eligibilityItems = [
    { key: 'elig_hzv', label: 'HZV' },
    { key: 'elig_dmp_diabetes', label: 'DMP Diabetes' },
    { key: 'elig_dmp_asthma', label: 'DMP Asthma' },
    { key: 'elig_dmp_copd', label: 'DMP COPD' },
    { key: 'elig_dmp_khk', label: 'DMP KHK' },
    { key: 'elig_dmp_obesity', label: 'DMP Obesity' }
  ];

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Program Eligibility</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {eligibilityItems.map(item => (
            <div key={item.key} className="flex items-center">
              <input 
                type="checkbox"
                id={item.key}
                checked={programEligibility[item.key] || false}
                onChange={(e) => onChange(item.key, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={item.key} className="text-sm">{item.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditableOpenQuestionsSection = ({ openQuestions, onChange }) => {
  if (!openQuestions || openQuestions.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Open Questions</h3>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {openQuestions.map((item, index) => (
            <div key={item.question_id} className="p-3 bg-amber-50 border border-amber-100 rounded-md">
              <Textarea
                value={item.questions || ''}
                onChange={(e) => onChange(index, 'questions', e.target.value)}
                className="w-full bg-transparent border-0 focus-visible:ring-0 p-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditableAssessmentPlanSection = ({ assessment, plan, onAssessmentChange, onPlanChange }) => {
  if (!assessment && !plan) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Assessment & Plan</h3>
      </div>
      <div className="p-4">
        {assessment && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Assessment</h4>
            <Textarea
              value={assessment.summary || ''}
              onChange={(e) => onAssessmentChange('summary', e.target.value)}
              className="w-full"
              rows={4}
            />
          </div>
        )}
        
        {plan && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Plan</h4>
            <Textarea
              value={plan.plan || ''}
              onChange={(e) => onPlanChange('plan', e.target.value)}
              className="w-full"
              rows={4}
            />
            
            {plan.next_appointment && (
              <div className="mt-3 p-2 bg-blue-50 border border-blue-100 rounded-md">
                <div className="text-sm font-medium text-blue-700 mb-1">Next Appointment</div>
                <Input
                  type="datetime-local"
                  value={plan.next_appointment ? new Date(plan.next_appointment).toISOString().slice(0, 16) : ''}
                  onChange={(e) => onPlanChange('next_appointment', new Date(e.target.value).toISOString())}
                  className="border-blue-200"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to format dates
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return dateString;
  }
};

export default PatientDashboard;
