
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  createdAt: string;
}

export interface Visit {
  id: string;
  patientId: string;
  visitDate: string;
  reasonForVisit: string;
  notes: string;
  createdBy: string;
}

export interface Vitals {
  id: string;
  visitId: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  recordedAt: string;
}

export interface Diagnosis {
  id: string;
  visitId: string;
  icd10Code: string;
  description: string;
}

export interface MedicalHistory {
  id: string;
  patientId: string;
  condition: string;
  status: 'active' | 'resolved';
  notes: string;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string | null;
}

// Sample patient
export const patient: Patient = {
  id: "p123",
  name: "Emma Thompson",
  dateOfBirth: "1985-04-12",
  gender: "female",
  createdAt: "2023-01-15T10:30:45Z",
};

// Sample visits
export const visits: Visit[] = [
  {
    id: "v1",
    patientId: "p123",
    visitDate: "2024-05-01T09:30:00Z",
    reasonForVisit: "Persistent cough and fever",
    notes: "Patient reporting symptoms for the past 5 days. Fever up to 101°F.",
    createdBy: "Dr. Michael Chen",
  },
  {
    id: "v2",
    patientId: "p123",
    visitDate: "2024-03-15T14:00:00Z",
    reasonForVisit: "Annual physical examination",
    notes: "Routine check-up, no significant findings.",
    createdBy: "Dr. Sarah Johnson",
  },
  {
    id: "v3",
    patientId: "p123",
    visitDate: "2024-01-22T11:15:00Z",
    reasonForVisit: "Headache and dizziness",
    notes: "Patient experiencing frequent headaches for the past 2 weeks, accompanied by occasional dizziness.",
    createdBy: "Dr. Michael Chen",
  },
];

// Sample vitals
export const vitals: Vitals[] = [
  {
    id: "vt1",
    visitId: "v1",
    bloodPressure: "128/85",
    heartRate: 88,
    temperature: 100.4,
    respiratoryRate: 18,
    recordedAt: "2024-05-01T09:40:00Z",
  },
  {
    id: "vt2",
    visitId: "v2",
    bloodPressure: "120/80",
    heartRate: 72,
    temperature: 98.6,
    respiratoryRate: 14,
    recordedAt: "2024-03-15T14:10:00Z",
  },
  {
    id: "vt3",
    visitId: "v3",
    bloodPressure: "135/88",
    heartRate: 78,
    temperature: 99.0,
    respiratoryRate: 16,
    recordedAt: "2024-01-22T11:25:00Z",
  },
];

// Sample diagnoses
export const diagnoses: Diagnosis[] = [
  {
    id: "d1",
    visitId: "v1",
    icd10Code: "J06.9",
    description: "Acute upper respiratory infection",
  },
  {
    id: "d2",
    visitId: "v3",
    icd10Code: "G43.909",
    description: "Migraine, unspecified, not intractable",
  },
];

// Sample medical history
export const medicalHistory: MedicalHistory[] = [
  {
    id: "mh1",
    patientId: "p123",
    condition: "Asthma",
    status: "active",
    notes: "Diagnosed in childhood. Occasional exacerbations during spring.",
  },
  {
    id: "mh2",
    patientId: "p123",
    condition: "Appendectomy",
    status: "resolved",
    notes: "Surgery performed in 2010. No complications.",
  },
  {
    id: "mh3",
    patientId: "p123",
    condition: "Migraine",
    status: "active",
    notes: "Occurs approximately once a month. Triggered by stress and lack of sleep.",
  },
];

// Sample medications
export const medications: Medication[] = [
  {
    id: "med1",
    patientId: "p123",
    name: "Albuterol",
    dosage: "90mcg",
    frequency: "As needed for asthma symptoms",
    startDate: "2018-05-10",
    endDate: null,
  },
  {
    id: "med2",
    patientId: "p123",
    name: "Sumatriptan",
    dosage: "50mg",
    frequency: "As needed for migraine attacks",
    startDate: "2022-02-15",
    endDate: null,
  },
  {
    id: "med3",
    patientId: "p123",
    name: "Amoxicillin",
    dosage: "500mg",
    frequency: "3 times daily for 10 days",
    startDate: "2024-01-22",
    endDate: "2024-02-01",
  },
];

// Sample vitals history for charts
export const vitalsHistory = [
  { date: '2023-06-10', systolic: 122, diastolic: 82, heartRate: 75, temperature: 98.6 },
  { date: '2023-08-22', systolic: 124, diastolic: 83, heartRate: 78, temperature: 98.4 },
  { date: '2023-10-15', systolic: 126, diastolic: 84, heartRate: 77, temperature: 98.8 },
  { date: '2023-12-05', systolic: 130, diastolic: 85, heartRate: 80, temperature: 99.0 },
  { date: '2024-01-22', systolic: 135, diastolic: 88, heartRate: 78, temperature: 99.0 },
  { date: '2024-03-15', systolic: 120, diastolic: 80, heartRate: 72, temperature: 98.6 },
  { date: '2024-05-01', systolic: 128, diastolic: 85, heartRate: 88, temperature: 100.4 },
];
