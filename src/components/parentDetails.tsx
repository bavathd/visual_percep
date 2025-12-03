import React, { useState, forwardRef, useImperativeHandle } from "react";

export interface UserDetailsData {
  name: string;
  dob: string;
  age: string;
  education: string;
  occupationStatus: string;
  occupationDetails: string;
  income: string;
  contact: string;
}

export interface UserDetailsHandle {
  getData: () => UserDetailsData;
}

interface UserDetailsProps {
  sectionTitle?: string;
}

const UserDetailsInner = (
  { sectionTitle = "Participant Information" }: UserDetailsProps,
  ref: React.Ref<UserDetailsHandle>
) => {
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [occupationStatus, setOccupationStatus] =
    useState<string>("Not Employed");
  const [occupationDetails, setOccupationDetails] = useState<string>("");
  const [income, setIncome] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const calculateAge = (dateString: string) => {
    if (!dateString) {
      setAge("");
      return;
    }

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

  useImperativeHandle(ref, () => ({
    getData: () => ({
      name,
      dob,
      age,
      education,
      occupationStatus,
      occupationDetails,
      income,
      contact,
    }),
  }));

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-black">{sectionTitle}</h2>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Name:</label>
        <input
          type="text"
          placeholder="Enter full name"
          className="border rounded-lg px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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

      <div className="flex flex-col">
        <label className="font-medium mb-1">Education:</label>
        <select
          className="border rounded-lg px-3 py-2"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        >
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

      <div className="flex flex-col">
        <label className="font-medium mb-1">Occupation:</label>
        <select
          value={occupationStatus}
          onChange={(e) => setOccupationStatus(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option>Employed</option>
          <option>Not Employed</option>
        </select>

        {occupationStatus === "Employed" && (
          <input
            type="text"
            placeholder="Specify occupation"
            className="border rounded-lg px-3 py-2 mt-2"
            value={occupationDetails}
            onChange={(e) => setOccupationDetails(e.target.value)}
          />
        )}
      </div>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Income (per annum):</label>
        <input
          type="number"
          placeholder="Enter income in ₹"
          className="border rounded-lg px-3 py-2"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Contact Number:</label>
        <input
          type="tel"
          placeholder="Enter 10-digit number"
          maxLength={14}
          className="border rounded-lg px-3 py-2"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
    </div>
  );
};

const UserDetails = forwardRef<UserDetailsHandle, UserDetailsProps>(
  UserDetailsInner
);

export default UserDetails;
