
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toast } from "sonner";

const ImportPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast: shadcnToast } = useToast();
  
  // Create FHIR MIO data with dynamic values
  const fhirData = {
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
          id: `patient-${id || Math.random().toString(36).substring(2, 11)}`,
          meta: {
            profile: ["https://fhir.kbv.de/StructureDefinition/KBV_PR_MIO_MR_Patient"]
          },
          name: [
            {
              use: "official",
              family: id ? `Patient-${id}` : "Mustermann",
              given: ["Max"]
            }
          ],
          gender: "male",
          birthDate: "1974-12-25"
        }
      },
      {
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
            reference: `Patient/patient-${id || Math.random().toString(36).substring(2, 11)}`
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
                value: Math.floor(Math.random() * (140 - 110)) + 110,
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
                value: Math.floor(Math.random() * (90 - 70)) + 70,
                unit: "mmHg",
                system: "http://unitsofmeasure.org",
                code: "mm[Hg]"
              }
            }
          ]
        }
      },
      {
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
            reference: `Patient/patient-${id || Math.random().toString(36).substring(2, 11)}`
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
      },
      {
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
            reference: `Patient/patient-${id || Math.random().toString(36).substring(2, 11)}`
          },
          recordedDate: new Date().toISOString().split('T')[0]
        }
      }
    ]
  };
  
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
        
        <div className="bg-black text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
          <pre>{JSON.stringify(fhirData, null, 2)}</pre>
        </div>
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
