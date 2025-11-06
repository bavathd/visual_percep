import React from "react";

const BirthAndMedicalInfo: React.FC = () => {
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
        4. Birth History
      </h4>

      {/* PRENATAL SECTION */}
      <div className="space-y-4">
        <h5 className="font-semibold text-black underline">Prenatal</h5>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Age of Mother during conception (Years)</label>
            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium">Age of Father during conception (Years)</label>
            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
        </div>

        {[
          "Gestational Diabetes",
          "Gestational Hypertension",
          "TORCH Infection",
          "Iron and Folic Acid Supplements",
          "Multiple births",
        ].map((item) => (
          <div key={item}>
            <label className="block text-sm font-medium">History of {item}</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
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
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Select</option>
            <option value="fullterm">37–42 weeks: Full-term</option>
            <option value="preterm">&lt;37 weeks: Pre-term</option>
            <option value="postterm">&gt;42 weeks: Post-term</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Birth Weight</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Select</option>
            <option value="avg">&gt;2500 gm: Average Birth Weight</option>
            <option value="low">1500–2500 gm: Low Birth Weight</option>
            <option value="vlow">1000–1500 gm: Very Low Birth Weight</option>
            <option value="elow">&lt;1000 gm: Extremely Low Birth Weight</option>
            <option value="ulow">&lt;750 gm: Ultra Low Birth Weight</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Immediate Cry</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2">
            <option value="">Select</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="delayed">Delayed</option>
          </select>
          <input
            type="text"
            placeholder="If delayed, specify duration"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Type of Delivery</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2">
            <option value="">Select</option>
            <option value="svd">SVD</option>
            <option value="lscs">LSCS</option>
            <option value="instrumental">Instrumental</option>
            <option value="others">Others</option>
          </select>
          <input
            type="text"
            placeholder="If others, specify"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">History of prolonged/difficult labour</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Select</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>
      </div>

      {/* POST-NATAL SECTION */}
      <div className="space-y-4">
        <h5 className="font-semibold text-black underline">Postnatal</h5>
        {[
          "NICU admission",
          "birth trauma",
          "Failure to Thrive",
          "Seizures/Infantile spasm",
          "Infections",
          "infantile stroke",
          "hydrocephalus/shunt placement",
        ].map((item) => (
          <div key={item}>
            <label className="block text-sm font-medium">History of {item}</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2">
              <option value="">Select</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
            <input
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
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          5. Medical Information
        </h4>

        {[
          "congenital or acquired vision problems",
          "any eye/brain surgery",
          "any regular medications taken",
          "Sleep Disturbances",
        ].map((item) => (
          <div key={item}>
            <label className="block text-sm font-medium">History of {item}</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2">
              <option value="">Select</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
            <input
              type="text"
              placeholder="If present, specify details"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}

        {/* Delayed Developmental Milestones */}
        <div>
          <label className="block text-sm font-medium">
            History of delayed developmental milestones
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2">
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
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

export default BirthAndMedicalInfo;
