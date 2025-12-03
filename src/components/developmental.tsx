import React, { useState, forwardRef, useImperativeHandle } from "react";
import type { ForwardRefRenderFunction } from "react";
// -----------------------------------------------------------
// TYPES
// -----------------------------------------------------------
export interface DevelopmentalInfoData {
  provisionalDiagnosis: string[];
  provisionalDiagnosisOther: string;
  diagnosedBy: string;
  diagnosedOther: string;
  comorbidConditions: string[];
  comorbidOther: string;
  communicationMethods: string[];
  behavioralStatus: string;
  behavioralDetails: string;
  therapies: string[];
  therapiesOther: string;
  attachedDocuments: string[];
}

export interface DevelopmentalInfoHandle {
  getData: () => DevelopmentalInfoData;
}

// -----------------------------------------------------------
// TagSelector Component (INTERNAL)
// -----------------------------------------------------------
interface TagSelectorProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const toggleTag = (tag: string) => {
    if (value.includes(tag)) {
      onChange(value.filter((t) => t !== tag));
    } else {
      onChange([...value, tag]);
    }
  };

  return (
    <div className="mb-6">
      <h4 className="text-base font-semibold mb-2 text-black">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleTag(option)}
              className={`px-3 py-1 rounded-full border text-sm ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-black border-gray-400"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {value.length > 0 && (
        <div className="mt-2 text-sm text-black">
          Selected: {value.join(", ")}
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------
const DevelopmentalInner: ForwardRefRenderFunction<
  DevelopmentalInfoHandle,
  object
> = (_, ref) => {
  // Tag selectors
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState<string[]>(
    []
  );
  const [comorbidConditions, setComorbidConditions] = useState<string[]>([]);
  const [therapies, setTherapies] = useState<string[]>([]);

  // Other fields
  const [provisionalDiagnosisOther, setProvisionalDiagnosisOther] =
    useState<string>("");
  const [diagnosedBy, setDiagnosedBy] = useState<string>("");
  const [diagnosedOther, setDiagnosedOther] = useState<string>("");

  const [comorbidOther, setComorbidOther] = useState<string>("");
  const [communicationMethods, setCommunicationMethods] = useState<string[]>(
    []
  );
  const [behavioralStatus, setBehavioralStatus] = useState<string>("");
  const [behavioralDetails, setBehavioralDetails] = useState<string>("");

  const [therapiesOther, setTherapiesOther] = useState<string>("");

  const [attachedDocuments, setAttachedDocuments] = useState<string[]>([]);

  // Handle checkbox groups
  const toggleCheckbox = (
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    if (list.includes(value)) {
      setList(list.filter((x) => x !== value));
    } else {
      setList([...list, value]);
    }
  };

  // -----------------------------------------------------------
  // getData() for parent extractions
  // -----------------------------------------------------------
  useImperativeHandle(ref, () => ({
    getData: () => ({
      provisionalDiagnosis,
      provisionalDiagnosisOther,
      diagnosedBy,
      diagnosedOther,
      comorbidConditions,
      comorbidOther,
      communicationMethods,
      behavioralStatus,
      behavioralDetails,
      therapies,
      therapiesOther,
      attachedDocuments,
    }),
  }));

  // -----------------------------------------------------------
  // JSX
  // -----------------------------------------------------------
  return (
    <div className="bg-white rounded-lg shadow-md border-l-4 border-l-warning p-6 space-y-8 text-black">
      <h4 className="text-lg font-semibold flex items-center gap-2">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        9. Neurodevelopmental Profile
      </h4>

      {/* Provisional Diagnosis */}
      <div className="space-y-2">
        <TagSelector
          label="Provisional Diagnosis"
          options={[
            "Autism Spectrum Disorder (ASD)",
            "Attention Deficit Hyperactivity Disorder (ADHD)",
            "Down Syndrome",
            "Cerebral Palsy",
            "Intellectual Disability",
            "Learning Disability / Dyslexia",
            "Hearing Impairment",
            "Visual Impairment",
            "Speech & Language Disorder",
            "Others (specify)",
          ]}
          value={provisionalDiagnosis}
          onChange={setProvisionalDiagnosis}
        />
        <input
          type="text"
          placeholder="If others, specify"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={provisionalDiagnosisOther}
          onChange={(e) => setProvisionalDiagnosisOther(e.target.value)}
        />
      </div>

      {/* Diagnosed By */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Diagnosed By</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={diagnosedBy}
          onChange={(e) => setDiagnosedBy(e.target.value)}
        >
          <option value="">Select</option>
          <option value="pediatrician">Pediatrician</option>
          <option value="clinical-psychologist">Clinical Psychologist</option>
          <option value="psychiatrist">Child Psychiatrist</option>
          <option value="neurologist">Neurologist</option>
          <option value="other">Other Professional (specify)</option>
        </select>

        <input
          type="text"
          placeholder="If other, specify"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={diagnosedOther}
          onChange={(e) => setDiagnosedOther(e.target.value)}
        />
      </div>

      {/* Comorbid Conditions */}
      <div className="space-y-2">
        <TagSelector
          label="Comorbid Conditions"
          options={[
            "Epilepsy",
            "Sensory Processing Disorder",
            "Congenital anomalies",
            "Others (specify)",
          ]}
          value={comorbidConditions}
          onChange={setComorbidConditions}
        />
        <input
          type="text"
          placeholder="If others, specify"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={comorbidOther}
          onChange={(e) => setComorbidOther(e.target.value)}
        />
      </div>

      {/* Communication Methods */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Primary Communication Method
        </label>
        <div className="flex flex-wrap gap-4">
          {[
            "Verbal",
            "Non-verbal",
            "Sign Language",
            "AAC Device",
            "Gestures",
          ].map((method) => (
            <label key={method} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={communicationMethods.includes(method)}
                onChange={() =>
                  toggleCheckbox(
                    method,
                    communicationMethods,
                    setCommunicationMethods
                  )
                }
              />
              <span>{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Behavioral Outbursts */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Any Behavioral Outbursts or Triggers
        </label>

        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          value={behavioralStatus}
          onChange={(e) => setBehavioralStatus(e.target.value)}
        >
          <option value="">Select</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>

        <input
          type="text"
          placeholder="If present, specify type"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={behavioralDetails}
          onChange={(e) => setBehavioralDetails(e.target.value)}
        />
      </div>

      {/* Special Classes / Therapies */}
      <div className="space-y-2">
        <TagSelector
          label="Special Classes / Therapies"
          options={[
            "Occupational Therapy (OT)",
            "Speech Therapy",
            "Special Education",
            "Behavioral Therapy",
            "Physical Therapy (PT)",
            "Others (specify)",
          ]}
          value={therapies}
          onChange={setTherapies}
        />

        <input
          type="text"
          placeholder="If others, specify"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={therapiesOther}
          onChange={(e) => setTherapiesOther(e.target.value)}
        />
      </div>

      {/* Document Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Attach Relevant Documents
        </label>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          {[
            "IEP/IDEP",
            "Medical/Diagnosis Reports",
            "Previous Visual/Neuro Assessments",
            "Physician/Therapists’ Letter",
          ].map((doc) => (
            <label key={doc} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={attachedDocuments.includes(doc)}
                onChange={() =>
                  toggleCheckbox(doc, attachedDocuments, setAttachedDocuments)
                }
              />
              <span>{doc}</span>
            </label>
          ))}
        </div>

        <input
          type="file"
          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer"
        />
      </div>
    </div>
  );
};

// -----------------------------------------------------------
// EXPORT
// -----------------------------------------------------------
const DevelopmentalDisorderInfo = forwardRef<DevelopmentalInfoHandle, object>(
  DevelopmentalInner
);

export default DevelopmentalDisorderInfo;
