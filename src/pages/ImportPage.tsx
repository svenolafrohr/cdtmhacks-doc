
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { parseJsonbField } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Define TypeScript interfaces for FHIR resources
interface FhirBaseResource {
  resourceType: string;
  id: string;
  meta: {
    profile: string[];
  };
}

interface FhirPatientResource extends FhirBaseResource {
  name: {
    use: string;
    family: string;
    given: string[];
  }[];
  gender: string;
  birthDate: string;
}

interface FhirObservationResource extends FhirBaseResource {
  status: string;
  category: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  }[];
  code: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
    text?: string;
  };
  subject: {
    reference: string;
  };
  effectiveDateTime: string;
  component?: {
    code: {
      coding: {
        system: string;
        code: string;
        display: string;
      }[];
    };
    valueQuantity: {
      value: number;
      unit: string;
      system: string;
      code: string;
    };
  }[];
}

interface FhirMedicationStatementResource extends FhirBaseResource {
  status: string;
  medicationCodeableConcept: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  };
  subject: {
    reference: string;
  };
  effectivePeriod: {
    start: string;
  };
  dosage: {
    text: string;
    timing?: {
      repeat: {
        frequency: number;
        period: number;
        periodUnit: string;
      };
    };
    route?: {
      coding: {
        system: string;
        code: string;
        display: string;
      }[];
    };
  }[];
}

interface FhirConditionResource extends FhirBaseResource {
  clinicalStatus: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  };
  verificationStatus: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  };
  category: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  }[];
  code: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
    text?: string;
  };
  subject: {
    reference: string;
  };
  recordedDate: string;
}

interface FhirAllergyIntoleranceResource extends FhirBaseResource {
  clinicalStatus: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  };
  verificationStatus: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  };
  type: string;
  category: string[];
  criticality: string;
  code: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
    text: string;
  };
  patient: {
    reference: string;
  };
  recordedDate: string;
}

interface FhirBundle {
  resourceType: "Bundle";
  id: string;
  meta: {
    lastUpdated: string;
  };
  type: string;
  entry: (
    | { resource: FhirPatientResource }
    | { resource: FhirObservationResource }
    | { resource: FhirMedicationStatementResource }
    | { resource: FhirConditionResource }
    | { resource: FhirAllergyIntoleranceResource }
  )[];
}

const ImportPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast: shadcnToast } = useToast();
  const [patientData, setPatientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      fetchPatientData(id);
    } else {
      setLoading(false);
    }
  }, [id]);
  
  const fetchPatientData = async (patientId: string) => {
    try {
      const { data, error } = await supabase
        .from('patient_record')
        .select('*')
        .eq('id', patientId)
        .single();
        
      if (error) {
        console.error('Error fetching patient data:', error);
        toast.error("Fehler beim Laden der Patientendaten");
        setLoading(false);
        return;
      }
      
      setPatientData(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch patient data:', err);
      toast.error("Fehler beim Laden der Patientendaten");
      setLoading(false);
    }
  };
  
  // Create FHIR MIO data with dynamic values
  const getFhirData = (): FhirBundle => {
    // If no patient data is available, return a template with some placeholder values
    if (!patientData && !id) {
      return {
        resourceType: "Bundle",
        id: "bundle-transaction",
        meta: {
          lastUpdated: new Date().toISOString()
        },
        type: "transaction",
        entry: [
          {
            resource: {
              resourceType: "Patient",
              id: `patient-${Math.random().toString(36).substring(2, 11)}`,
              meta: {
                profile: ["https://fhir.kbv.de/StructureDefinition/KBV_PR_MIO_MR_Patient"]
              },
              name: [
                {
                  use: "official",
                  family: "Mustermann",
                  given: ["Max"]
                }
              ],
              gender: "male",
              birthDate: "1974-12-25"
            }
          }
        ]
      };
    }
    
    // Use actual patient data when available
    const patientId = patientData?.id || id || Math.random().toString(36).substring(2, 11);
    const firstName = patientData?.first_name || "Max";
    const lastName = patientData?.last_name || `Patient-${id}`;
    const birthDate = patientData?.dob || "1974-12-25";
    
    // Parse jsonb fields from patient data
    const allergies = parseJsonbField<any[]>(patientData?.allergies) || [];
    const medications = parseJsonbField<any[]>(patientData?.medications) || [];
    const diagnoses = parseJsonbField<any[]>(patientData?.diagnoses) || [];
    const vitalSigns = parseJsonbField<any>(patientData?.vital_signs) || {};
    
    const fhirData: FhirBundle = {
      resourceType: "Bundle",
      id: "bundle-transaction",
      meta: {
        lastUpdated: new Date().toISOString()
      },
      type: "transaction",
      entry: [
        {
          resource: {
            resourceType: "Patient",
            id: `patient-${patientId}`,
            meta: {
              profile: ["https://fhir.kbv.de/StructureDefinition/KBV_PR_MIO_MR_Patient"]
            },
            name: [
              {
                use: "official",
                family: lastName,
                given: [firstName]
              }
            ],
            gender: patientData?.gender || "male",
            birthDate: birthDate
          }
        }
      ]
    };
    
    // Add blood pressure observation if vital signs are available
    if (vitalSigns?.blood_pressure) {
      const systolic = vitalSigns.blood_pressure.systolic || Math.floor(Math.random() * (140 - 110)) + 110;
      const diastolic = vitalSigns.blood_pressure.diastolic || Math.floor(Math.random() * (90 - 70)) + 70;
      
      fhirData.entry.push({
        resource: {
          resourceType: "Observation",
          id: `bp-${new Date().getTime()}`,
          meta: {
            profile: ["https://fhir.kbv.de/StructureDefinition/KBV_PR_MIO_Observation_BloodPressure"]
          },
          status: "final",
          category: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/observation-category",
                  code: "vital-signs",
                  display: "Vital Signs"
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: "http://loinc.org",
                code: "85354-9",
                display: "Blood pressure panel with all children optional"
              }
            ],
            text: "Blood pressure systolic & diastolic"
          },
          subject: {
            reference: `Patient/patient-${patientId}`
          },
          effectiveDateTime: new Date().toISOString(),
          component: [
            {
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "8480-6",
                    display: "Systolic blood pressure"
                  }
                ]
              },
              valueQuantity: {
                value: systolic,
                unit: "mmHg",
                system: "http://unitsofmeasure.org",
                code: "mm[Hg]"
              }
            },
            {
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "8462-4",
                    display: "Diastolic blood pressure"
                  }
                ]
              },
              valueQuantity: {
                value: diastolic,
                unit: "mmHg",
                system: "http://unitsofmeasure.org",
                code: "mm[Hg]"
              }
            }
          ]
        }
      });
    }
    
    // Add medications if available
    if (medications && medications.length > 0) {
      medications.slice(0, 3).forEach((med, index) => {
        fhirData.entry.push({
          resource: {
            resourceType: "MedicationStatement",
            id: `med-${new Date().getTime() + index}`,
            meta: {
              profile: ["https://fhir.kbv.de/StructureDefinition/KBV_PR_MIO_MedicationStatement"]
            },
            status: "active",
            medicationCodeableConcept: {
              coding: [
                {
                  system: "http://fhir.de/CodeSystem/ifa/pzn",
                  code: med.pzn || "12345678",
                  display: med.medication || "Medication"
                }
              ]
            },
            subject: {
              reference: `Patient/patient-${patientId}`
            },
            effectivePeriod: {
              start: med.start_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            },
            dosage: [
              {
                text: med.dosage || "1-0-0-0",
                timing: {
                  repeat: {
                    frequency: 1,
                    period: 1,
                    periodUnit: "d"
                  }
                },
                route: {
                  coding: [
                    {
                      system: "http://standardterms.edqm.eu",
                      code: "20053000",
                      display: "Oral use"
                    }
                  ]
                }
              }
            ]
          }
        });
      });
    } else {
      // Add a placeholder medication
      fhirData.entry.push({
        resource: {
          resourceType: "MedicationStatement",
          id: `med-${new Date().getTime()}`,
          meta: {
            profile: ["https://fhir.kbv.de/StructureDefinition/KBV_PR_MIO_MedicationStatement"]
          },
          status: "active",
          medicationCodeableConcept: {
            coding: [
              {
                system: "http://fhir.de/CodeSystem/ifa/pzn",
                code: "12345678",
                display: "Aspirin 100mg Tabletten"
              }
            ]
          },
          subject: {
            reference: `Patient/patient-${patientId}`
          },
          effectivePeriod: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          },
          dosage: [
            {
              text: "1-0-0-0",
              timing: {
                repeat: {
                  frequency: 1,
                  period: 1,
                  periodUnit: "d"
                }
              },
              route: {
                coding: [
                  {
                    system: "http://standardterms.edqm.eu",
                    code: "20053000",
                    display: "Oral use"
                  }
                ]
              }
            }
          ]
        }
      });
    }
    
    // Add diagnoses if available
    if (diagnoses && diagnoses.length > 0) {
      diagnoses.slice(0, 3).forEach((diag, index) => {
        fhirData.entry.push({
          resource: {
            resourceType: "Condition",
            id: `condition-${new Date().getTime() + index}`,
            meta: {
              profile: ["https://fhir.kbv.de/StructureDefinition/KBV_PR_MIO_Condition"]
            },
            clinicalStatus: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  code: "active",
                  display: "Active"
                }
              ]
            },
            verificationStatus: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  code: "confirmed",
                  display: "Confirmed"
                }
              ]
            },
            category: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/condition-category",
                    code: "problem-list-item",
                    display: "Problem List Item"
                  }
                ]
              }
            ],
            code: {
              coding: [
                {
                  system: "http://fhir.de/CodeSystem/bfarm/icd-10-gm",
                  code: diag.icd10_code || "R00.0",
                  display: diag.diagnosis_name || "Unspecified diagnosis"
                }
              ],
              text: diag.diagnosis_name || "Unspecified"
            },
            subject: {
              reference: `Patient/patient-${patientId}`
            },
            recordedDate: diag.diagnosis_date || new Date().toISOString().split('T')[0]
          }
        });
      });
    } else {
      // Add a placeholder condition
      fhirData.entry.push({
        resource: {
          resourceType: "Condition",
          id: `condition-${new Date().getTime()}`,
          meta: {
            profile: ["https://fhir.kbv.de/StructureDefinition/KBV_PR_MIO_Condition"]
          },
          clinicalStatus: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                code: "active",
                display: "Active"
              }
            ]
          },
          verificationStatus: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                code: "confirmed",
                display: "Confirmed"
              }
            ]
          },
          category: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/condition-category",
                  code: "problem-list-item",
                  display: "Problem List Item"
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: "http://fhir.de/CodeSystem/bfarm/icd-10-gm",
                code: "I10.90",
                display: "Essentielle Hypertonie, nicht näher bezeichnet"
              }
            ],
            text: "Hypertonie"
          },
          subject: {
            reference: `Patient/patient-${patientId}`
          },
          recordedDate: new Date().toISOString().split('T')[0]
        }
      });
    }
    
    // Add allergies if available
    if (allergies && allergies.length > 0) {
      allergies.slice(0, 3).forEach((allergy, index) => {
        fhirData.entry.push({
          resource: {
            resourceType: "AllergyIntolerance",
            id: `allergy-${new Date().getTime() + index}`,
            meta: {
              profile: ["https://fhir.kbv.de/StructureDefinition/KBV_PR_MIO_AllergyIntolerance"]
            },
            clinicalStatus: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                  code: "active",
                  display: "Active"
                }
              ]
            },
            verificationStatus: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                  code: "confirmed",
                  display: "Confirmed"
                }
              ]
            },
            type: "allergy",
            category: ["medication"],
            criticality: allergy.severity === "high" ? "high" : "low",
            code: {
              coding: [
                {
                  system: "http://fhir.de/CodeSystem/bfarm/icd-10-gm",
                  code: allergy.icd10_code || "Z88.0",
                  display: allergy.name || "Unspecified allergy"
                }
              ],
              text: allergy.name || "Unspecified allergy"
            },
            patient: {
              reference: `Patient/patient-${patientId}`
            },
            recordedDate: new Date().toISOString().split('T')[0]
          }
        });
      });
    }
    
    return fhirData;
  };

  const fhirData = getFhirData();
  
  const handleConfirm = () => {
    // Show confirmation with OK button using Sonner toast
    toast("Übertragung erfolgreich", {
      description: "Die FHIR MIO Objekte wurden erfolgreich übertragen",
      duration: 4000,
      action: {
        label: "OK",
        onClick: () => navigate('/patients')
      }
    });
  };
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/patient/${id || ''}`)}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Zurück
        </Button>
        <h1 className="text-2xl font-semibold">FHIR MIO Export</h1>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <div className="mb-2 text-lg font-medium">HL7 FHIR MIO Objekte</div>
        <p className="mb-4 text-sm text-gray-600">
          Diese Daten werden in das Electronic Health Record System übertragen.
        </p>
        
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-[200px] w-full bg-gray-200" />
            <Skeleton className="h-[100px] w-full bg-gray-200" />
          </div>
        ) : (
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <pre>{JSON.stringify(fhirData, null, 2)}</pre>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleConfirm}
          className="px-8 py-6 bg-teal-700 text-white hover:bg-teal-800"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          Bestätigen
        </Button>
      </div>
    </div>
  );
};

export default ImportPage;
