# Avi medical doctor Fronend
CDTM hacks 2025, milana + freddy + max + sven

## database schema (flattened JSON)
```
encounter: {
    visit_date: "ISO-date-time",
    chief_complaint: "string",
    history_of_present_illness: "string"
  },


prior_med_history: [
    {
      event_datetime: "ISO-date-time",
      event_type: "string",
      event_details: "string"
    }
  ],

diagnoses: [
    {
      diagnosis_date: "ISO-date-time",
      diagnosis_name: "string",
      icd10_code: "string",
      diagnosis_details: "string"
    }
  ],

medications: [
    {
      name: "string",
      dose: "string",
      amount_morning: integer,
      amount_noon: integer,
      amount_evening: integer,
      amount_night: integer,
      comment: "string"
    }
  ],

allergies: [
    {
      name: "string",
      icd10_code: "string"
      datetime: "datetime"
      details: "text"
    }
  ],


family_history: [
    {
      relative_name: "string",
      history: "string"
    }
  ],

social_history: [
    {
      patient_id: "uuid",
      drinking: "string",
      smoking: "string",
      drugs: "string",
      marital_status: "string",
      kids: integer,
      job: "string"
    }
  ],

review_of_systems: [
    {
      system_name: "string",
      details: "string"
    }
  ],

vital_signs: {
    datetime: "ISO-date-time",
    weight: "integer",
    height: integer,
    bmi: integer
  },

lab_results: [
    {
      datetime: "ISO-date-time",
      analyte: "string",
      level: integer,
      unit: "string",
      method: "string",
      ref_range_lower: integer,
      ref_range_upper: integer,
      is_abnormal: boolean,
      lab_provider: {
        name: "string",
        address: "string"
      }
    }
  ],

observations: [ //eg. ECG, XRAY
    {
      datetime: "ISO-date-time",
      type: "string",
      result: "string"
    }
  ],

  wearable_observations: [
    {
      measurement_type: "string",
      datetime: "ISO-date-time",
      systolic: integer,
      diastolic: integer,
      frequency: integer,
      analyte: "string",
      level: integer,
      unit: "string",
      method: "string",
      ref_range_lower: integer,
      ref_range_upper: integer,
      is_abnormal: boolean,
    }
  ],

  immunizations: [
    {
      date: "YYYY-MM-DD",
      disease: "string",
      vaccine_name: "string",
      batch_number: "string",
      best_before: "YYYY-MM-DD",
      doctor_name: "string",
      doctor_address: { /* object */ },
      details: "string"
    }
  ],

  screenings: [
    {
      type: "string",
      date: "YYYY-MM-DD",
      details: "string"
    }
  ],

  practitioners: [
    {
      last_name: "string",
      first_name: "string",
      function: "string",
    }
  ],

  program_eligibility: {
    elig_hzv: boolean,
    elig_dmp_diabetes: boolean,
    elig_dmp_asthma: boolean,
    elig_dmp_copd: boolean,
    elig_dmp_khk: boolean,
    elig_dmp_obesity: boolean
  },

  open_questions: [
    {
      question_id: "uuid",
      questions: "string"
    }
  ],

  assessment: {
    summary: "string"
  },

  plan: {
    plan: "string",
    next_appointment: "ISO-date-time"
  }
}
```

```



## mapping to HL7 FHIR MIO objects
- to provide the functional FHIR API, we still need to build an edge function, that maps our internal database schema to the MIO objects


## What technologies are used for this project?
This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
