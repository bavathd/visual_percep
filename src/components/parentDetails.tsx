import React, { useState } from "react";

interface UserDetailsProps {
  sectionTitle?: string; // e.g. "Father's Details"
}

const UserDetails: React.FC<UserDetailsProps> = ({ sectionTitle = "Participant Information" }) => {
  const [dob, setDob] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("Not Employed");

  const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge(`${years} years, ${months} months`);
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setDob(dateValue);
    calculateAge(dateValue);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg space-y-4">
      {/* Dynamic Title */}
      <h2 className="text-xl font-semibold text-black">
        {sectionTitle}
      </h2>

      {/* Name */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Name:</label>
        <input
          type="text"
          placeholder="Enter full name"
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* DOB + Age */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1 flex flex-col">
          <label className="font-medium mb-1">Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={handleDobChange}
            className="border rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex-1 flex flex-col mt-3 md:mt-0">
          <label className="font-medium mb-1">Age:</label>
          <input
            type="text"
            value={age}
            readOnly
            className="border rounded-lg px-3 py-2 bg-gray-100"
            placeholder="Auto calculated"
          />
        </div>
      </div>

      {/* Education */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Education:</label>
        <select className="border rounded-lg px-3 py-2" >
          <option value="">Select Education Level</option>
          <option>No formal education</option>
          <option>Primary school certificate (below class VIII)</option>
          <option>Middle school certificate (Class VIII and IX pass)</option>
          <option>High school certificate (Class X, XI pass)</option>
          <option>Intermediate or diploma (Class XII pass or Diploma)</option>
          <option>Graduate (Bachelor degree)</option>
          <option>Profession or honors (Masters/Ph.D./Higher education)</option>
        </select>
      </div>

      {/* Occupation */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Occupation:</label>
        <select
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option>Employed</option>
          <option>Not Employed</option>
        </select>

        {occupation === "Employed" && (
          <input
            type="text"
            placeholder="Specify occupation"
            className="border rounded-lg px-3 py-2 mt-2"
          />
        )}
      </div>

      {/* Income */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Income (per annum):</label>
        <input
          type="number"
          placeholder="Enter income in ₹"
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* Contact Number */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Contact Number:</label>
        <input
          type="tel"
          placeholder="Enter 10-digit number"
          maxLength={14}
          className="border rounded-lg px-3 py-2"
        />
      </div>
    </div>
  );
};

export default UserDetails;
