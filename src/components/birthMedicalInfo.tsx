import React, { forwardRef, useImperativeHandle, useRef } from "react";

export interface BirthAndMedicalInfoHandle {
  getData: () => Record<string, string | string[]>;
}

const PRENATAL_HISTORY_ITEMS = [
  { key: "gestationalDiabetes", label: "Gestational Diabetes" },
  { key: "gestationalHypertension", label: "Gestational Hypertension" },
  { key: "torchInfection", label: "TORCH Infection" },
  { key: "ironFolic", label: "Iron and Folic Acid Supplements" },
  { key: "multipleBirths", label: "Multiple Births" },
];

const POSTNATAL_HISTORY_ITEMS = [
  { key: "nicuAdmission", label: "NICU Admission" },
  { key: "birthTrauma", label: "Birth Trauma" },
  { key: "failureToThrive", label: "Failure to Thrive" },
  { key: "seizures", label: "Seizures/Infantile Spasm" },
  { key: "infections", label: "Infections" },
  { key: "infantileStroke", label: "Infantile Stroke" },
  { key: "hydrocephalus", label: "Hydrocephalus/Shunt Placement" },
];

const MEDICAL_INFO_ITEMS = [
  {
    key: "visionProblems",
    label: "Congenital or Acquired Vision Problems",
  },
  { key: "eyeBrainSurgery", label: "Any Eye/Brain Surgery" },
  { key: "regularMedications", label: "Any Regular Medications Taken" },
  { key: "sleepDisturbances", label: "Sleep Disturbances" },
];

const BirthAndMedicalInfoInner = (
  _: object,
  ref: React.Ref<BirthAndMedicalInfoHandle>
) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    getData() {
      const output: Record<string, string | string[]> = {};
      const root = rootRef.current;
      if (!root) return output;

      const elements = root.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >("input[name], select[name], textarea[name]");

      elements.forEach((el) => {
        const name = el.name;
        if (!name) return;

        if (el instanceof HTMLInputElement) {
          if (el.type === "checkbox") {
            if (!output[name]) output[name] = [];
            if (el.checked) {
              (output[name] as string[]).push(el.value || "on");
            }
          } else if (el.type === "radio") {
            if (el.checked) {
              output[name] = el.value;
            }
          } else {
            output[name] = el.value;
          }
        } else {
          output[name] = el.value;
        }
      });

      return output;
    },
  }));

  return (
    <div
      ref={rootRef}
      className="bg-white rounded-lg shadow-md border-l-4 border-l-warning p-6 space-y-8 text-black"
    >
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
        4. Birth History
      </h4>

      {/* PRENATAL SECTION */}
      <div className="space-y-4">
        <h5 className="font-semibold text-black underline">Prenatal</h5>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Age of Mother during conception (Years)
            </label>
            <input
              name="prenatal_motherAge"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Age of Father during conception (Years)
            </label>
            <input
              name="prenatal_fatherAge"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {PRENATAL_HISTORY_ITEMS.map((item) => (
          <div key={item.key}>
            <label className="block text-sm font-medium">
              History of {item.label}
            </label>
            <select
              name={`prenatal_${item.key}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        ))}
      </div>

      {/* NATAL SECTION */}
      <div className="space-y-4">
        <h5 className="font-semibold text-black underline">Natal</h5>

        <div>
          <label className="block text-sm font-medium">Gestational Age</label>
          <select
            name="natal_gestationalAge"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="fullterm">37–42 weeks: Full-term</option>
            <option value="preterm">&lt;37 weeks: Pre-term</option>
            <option value="postterm">&gt;42 weeks: Post-term</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Birth Weight</label>
          <select
            name="natal_birthWeight"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="avg">&gt;2500 gm: Average Birth Weight</option>
            <option value="low">1500–2500 gm: Low Birth Weight</option>
            <option value="vlow">1000–1500 gm: Very Low Birth Weight</option>
            <option value="elow">
              &lt;1000 gm: Extremely Low Birth Weight
            </option>
            <option value="ulow">&lt;750 gm: Ultra Low Birth Weight</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Immediate Cry</label>
          <select
            name="natal_immediateCry"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          >
            <option value="">Select</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="delayed">Delayed</option>
          </select>
          <input
            name="natal_immediateCryDelayDetails"
            type="text"
            placeholder="If delayed, specify duration"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Type of Delivery</label>
          <select
            name="natal_deliveryType"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          >
            <option value="">Select</option>
            <option value="svd">SVD</option>
            <option value="lscs">LSCS</option>
            <option value="instrumental">Instrumental</option>
            <option value="others">Others</option>
          </select>
          <input
            name="natal_deliveryTypeOther"
            type="text"
            placeholder="If others, specify"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            History of Prolonged/Difficult Labour
          </label>
          <select
            name="natal_difficultLabour"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>
      </div>

      {/* POST-NATAL SECTION */}
      <div className="space-y-4">
        <h5 className="font-semibold text-black underline">Postnatal</h5>
        {POSTNATAL_HISTORY_ITEMS.map((item) => (
          <div key={item.key}>
            <label className="block text-sm font-medium">
              History of {item.label}
            </label>
            <select
              name={`postnatal_${item.key}_status`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            >
              <option value="">Select</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
            <input
              name={`postnatal_${item.key}_details`}
              type="text"
              placeholder={`If present, specify details`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}
      </div>

      {/* SECTION 5 - MEDICAL INFORMATION */}
      <div className="space-y-4">
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
          5. Medical Information
        </h4>

        {MEDICAL_INFO_ITEMS.map((item) => (
          <div key={item.key}>
            <label className="block text-sm font-medium">
              History of {item.label}
            </label>
            <select
              name={`medical_${item.key}_status`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            >
              <option value="">Select</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
            <input
              name={`medical_${item.key}_details`}
              type="text"
              placeholder="If present, specify details"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}

        {/* Delayed Developmental Milestones */}
        <div>
          <label className="block text-sm font-medium">
            History of Delayed Developmental Milestones
          </label>
          <select
            name="medical_delayedMilestones_status"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <select
            name="medical_delayedMilestones_type"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">If yes, specify</option>
            <option value="motor">Motor</option>
            <option value="language">Language</option>
            <option value="social">Social and Emotional</option>
            <option value="cognitive">Cognitive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(BirthAndMedicalInfoInner);
