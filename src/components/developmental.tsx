import React, {useState} from "react";


interface TagSelectorProps {
  label: string;
  options: string[];
}

const TagSelector: React.FC<TagSelectorProps> = ({ label, options }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter((t) => t !== tag));
    } else {
      setSelected([...selected, tag]);
    }
  };

  return (
    <div className="mb-6">
      <h4 className="text-base font-semibold mb-2 text-black">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
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
      {/* Show selected tags summary below */}
      {selected.length > 0 && (
        <div className="mt-2 text-sm text-black">
          Selected: {selected.join(", ")}
        </div>
      )}
    </div>
  );
};

const DevelopmentalDisorderInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md border-l-4 border-l-warning p-6 space-y-8 text-black">
      {/* Section Title */}
      <h4 className="text-lg font-semibold flex items-center gap-2">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        9. Developmental / Neurodevelopmental / Neurodivergent Condition
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
        />
        <input
          type="text"
          placeholder="If others, specify"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Diagnosed By */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Diagnosed By</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
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
        />
        <input
          type="text"
          placeholder="If others, specify"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Primary Communication Method */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Primary Communication Method</label>
        <div className="flex flex-wrap gap-4">
          {["Verbal", "Non-verbal", "Sign Language", "AAC Device", "Gestures"].map((method) => (
            <label key={method} className="flex items-center space-x-2">
              <input type="checkbox" className="accent-primary" />
              <span>{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Behavioral Outbursts or Triggers */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Any Behavioral Outbursts or Triggers</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2">
          <option value="">Select</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
        <input
          type="text"
          placeholder="If present, specify type"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
        />
        <input
          type="text"
          placeholder="If others, specify"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Document Upload Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Attach Relevant Documents</label>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          {[
            "IEP/IDEP",
            "Medical/Diagnosis Reports",
            "Previous Visual/Neuro Assessments",
            "Physician/Therapists’ Letter",
          ].map((doc) => (
            <label key={doc} className="flex items-center space-x-2">
              <input type="checkbox" className="accent-primary" />
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

export default DevelopmentalDisorderInfo;
