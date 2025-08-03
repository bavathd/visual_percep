import { useState } from 'react';

const VisualPerceptionForm = () => {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    setAge(`${years} years, ${months} months`);
  };

  const calculateBMI = () => {
    if (height && weight) {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      const bmiValue = (w / (h * h)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "bg-warning text-warning-foreground" };
    if (bmi < 25) return { category: "Normal", color: "bg-success text-success-foreground" };
    if (bmi < 30) return { category: "Overweight", color: "bg-warning text-warning-foreground" };
    return { category: "Obese", color: "bg-destructive text-destructive-foreground" };
  };

  return (
    <div className="min-h-screen bg-form p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg border border-primary/20 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h1 className="text-2xl md:text-3xl font-bold">Visual Perception Assessment Form</h1>
              </div>
              <p className="text-primary-foreground/90">
                Comprehensive developmental and visual perception evaluation
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          {/* Personal Details */}
          <div className="bg-white rounded-lg shadow-md border-l-4 border-l-primary">
            <div className="p-6 border-b border-form-border">
              <h2 className="text-xl font-semibold text-form-header flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                1. Personal Details
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    placeholder="Enter full name" 
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Gender *</label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input type="radio" name="gender" value="male" className="mr-2 text-primary" />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="gender" value="female" className="mr-2 text-primary" />
                      Female
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="gender" value="other" className="mr-2 text-primary" />
                      Other
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                  <input 
                    type="date" 
                    id="dob"
                    value={dob} 
                    onChange={(e) => { setDob(e.target.value); calculateAge(e.target.value); }}
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Calculated Age</label>
                  <div className="p-3 bg-accent-light rounded-md border">
                    <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                      {age || "Enter date of birth"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">Primary Language *</label>
                <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Select primary language</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="tamil">Tamil</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-form-header mb-3">Guardian Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">Parent/Guardian Name *</label>
                    <input 
                      type="text" 
                      id="guardianName" 
                      placeholder="Enter guardian name" 
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">Relationship to Child *</label>
                    <input 
                      type="text" 
                      id="relationship" 
                      placeholder="e.g., Mother, Father, Guardian" 
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">Marital Status</label>
                    <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="separated">Separated</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Primary Contact Number *</label>
                    <input 
                      type="tel" 
                      id="contactNumber" 
                      placeholder="Enter contact number" 
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="motherAge" className="block text-sm font-medium text-gray-700">Mother's Age</label>
                    <input 
                      type="number" 
                      id="motherAge" 
                      placeholder="Age" 
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="fatherAge" className="block text-sm font-medium text-gray-700">Father's Age</label>
                    <input 
                      type="number" 
                      id="fatherAge" 
                      placeholder="Age" 
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="motherOccupation" className="block text-sm font-medium text-gray-700">Mother's Occupation</label>
                    <input 
                      type="text" 
                      id="motherOccupation" 
                      placeholder="Enter occupation" 
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="fatherOccupation" className="block text-sm font-medium text-gray-700">Father's Occupation</label>
                    <input 
                      type="text" 
                      id="fatherOccupation" 
                      placeholder="Enter occupation" 
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address *</label>
                  <textarea 
                    id="address" 
                    placeholder="Enter complete address" 
                    rows={3}
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="familyIncome" className="block text-sm font-medium text-gray-700">Family Income</label>
                    <input 
                      type="text" 
                      id="familyIncome" 
                      placeholder="Annual income range" 
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="socioeconomicStatus" className="block text-sm font-medium text-gray-700">Socioeconomic Status</label>
                    <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="">Select status</option>
                      <option value="low">Low Income</option>
                      <option value="middle">Middle Income</option>
                      <option value="upper-middle">Upper Middle Income</option>
                      <option value="high">High Income</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Information */}
          <div className="bg-white rounded-lg shadow-md border-l-4 border-l-accent">
            <div className="p-6 border-b border-form-border">
              <h2 className="text-xl font-semibold text-form-header flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                2. Physical Information
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm) *</label>
                  <input 
                    type="number" 
                    id="height"
                    placeholder="Height in cm"
                    value={height} 
                    onChange={(e) => { setHeight(e.target.value); calculateBMI(); }}
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg) *</label>
                  <input 
                    type="number" 
                    id="weight"
                    placeholder="Weight in kg"
                    value={weight} 
                    onChange={(e) => { setWeight(e.target.value); calculateBMI(); }}
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">BMI</label>
                  <div className="p-3 bg-accent-light rounded-md border">
                    {bmi && (
                      <div className="flex flex-col gap-1">
                        <span className="inline-block px-2 py-1 bg-gray-100 border rounded text-sm font-medium">
                          BMI: {bmi}
                        </span>
                        <span className={`inline-block px-2 py-1 rounded text-xs text-white ${getBMICategory(parseFloat(bmi)).color}`}>
                          {getBMICategory(parseFloat(bmi)).category}
                        </span>
                      </div>
                    )}
                    {!bmi && <span className="text-muted-foreground text-sm">Enter height & weight</span>}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="visionStatus" className="block text-sm font-medium text-gray-700">Vision Status</label>
                  <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">Select vision status</option>
                    <option value="normal">Normal</option>
                    <option value="needs-checkup">Needs Checkup</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Visual Aids</label>
                  <div className="flex items-center space-x-2 p-3 border border-input-border rounded-md">
                    <input type="checkbox" id="glasses" className="text-primary" />
                    <label htmlFor="glasses" className="text-sm">Wears Glasses/Contact Lenses</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* School Details */}
          <div className="bg-white rounded-lg shadow-md border-l-4 border-l-warning">
            <div className="p-6 border-b border-form-border">
              <h2 className="text-xl font-semibold text-form-header flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                3. School Details
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">School Name *</label>
                <input 
                  type="text" 
                  id="schoolName" 
                  placeholder="Enter school name" 
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="classSection" className="block text-sm font-medium text-gray-700">Class & Section *</label>
                  <input 
                    type="text" 
                    id="classSection" 
                    placeholder="e.g., Grade 5-A" 
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="schoolType" className="block text-sm font-medium text-gray-700">School Type</label>
                  <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">Select school type</option>
                    <option value="mainstream">Mainstream</option>
                    <option value="special">Special Education</option>
                    <option value="inclusive">Inclusive</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="schoolAddress" className="block text-sm font-medium text-gray-700">School Address</label>
                <textarea 
                  id="schoolAddress" 
                  placeholder="Enter school address" 
                  rows={2}
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
              <div className="space-y-2">
                <label htmlFor="supportStaff" className="block text-sm font-medium text-gray-700">Support Staff Assigned</label>
                <input 
                  type="text" 
                  id="supportStaff" 
                  placeholder="e.g., Special educator, Aide" 
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white rounded-lg shadow-md border-l-4 border-l-destructive">
            <div className="p-6 border-b border-form-border">
              <h2 className="text-xl font-semibold text-form-header flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                4. Medical Information
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">Medical History</label>
                <textarea 
                  id="medicalHistory" 
                  placeholder="Include allergies, seizure history, sleep issues, current medications, etc."
                  rows={4}
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Regular Medical Care</label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input type="radio" name="medicalCare" value="yes" className="mr-2 text-primary" />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="medicalCare" value="no" className="mr-2 text-primary" />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Developmental Disability */}
          <div className="bg-white rounded-lg shadow-md border-l-4 border-l-primary">
            <div className="p-6 border-b border-form-border">
              <h2 className="text-xl font-semibold text-form-header flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                5. Developmental Disability & Communication
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">Diagnosis/Condition</label>
                  <input 
                    type="text" 
                    id="diagnosis" 
                    placeholder="Enter diagnosis if any" 
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="diagnosedBy" className="block text-sm font-medium text-gray-700">Diagnosed By</label>
                  <input 
                    type="text" 
                    id="diagnosedBy" 
                    placeholder="Doctor/Specialist name" 
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="comorbidConditions" className="block text-sm font-medium text-gray-700">Comorbid Conditions</label>
                <input 
                  type="text" 
                  id="comorbidConditions" 
                  placeholder="Any additional conditions" 
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Communication Methods (Check all that apply)</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { id: "verbal", label: "Verbal Communication" },
                    { id: "nonverbal", label: "Non-verbal Communication" },
                    { id: "sign", label: "Sign Language" },
                    { id: "aac", label: "AAC Device" },
                    { id: "gestures", label: "Gestures" },
                    { id: "other-comm", label: "Other Methods" }
                  ].map((method) => (
                    <div key={method.id} className="flex items-center space-x-2 p-3 border border-input-border rounded-md">
                      <input type="checkbox" id={method.id} className="text-primary" />
                      <label htmlFor={method.id} className="text-sm">{method.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Requires Special Support/Accommodations</label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input type="radio" name="support" value="yes" className="mr-2 text-primary" />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="support" value="no" className="mr-2 text-primary" />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-white rounded-lg shadow-md border-l-4 border-l-accent">
            <div className="p-6 border-b border-form-border">
              <h2 className="text-xl font-semibold text-form-header flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                6. Document Upload
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Required Documents (Check available documents)</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { id: "iep", label: "IEP/IDEP Report" },
                    { id: "medical", label: "Medical/Diagnosis Reports" },
                    { id: "visual", label: "Previous Visual/Neuro Assessments" },
                    { id: "doctor", label: "Doctor's Letter/Prescription" }
                  ].map((doc) => (
                    <div key={doc.id} className="flex items-center space-x-2 p-3 border border-input-border rounded-md">
                      <input type="checkbox" id={doc.id} className="text-primary" />
                      <label htmlFor={doc.id} className="text-sm">{doc.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">Upload Documents</label>
                <div className="border-2 border-dashed border-input-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <svg className="h-8 w-8 mx-auto text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop files here
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                  </p>
                  <input type="file" multiple className="hidden" id="fileUpload" />
                  <button 
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    onClick={() => document.getElementById('fileUpload')?.click()}
                  >
                    Select Files
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="bg-white rounded-lg shadow-md border-2 border-primary/20">
            <div className="p-6 border-b border-form-border">
              <h2 className="text-xl font-semibold text-form-header">7. Consent & Authorization</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-primary-light rounded-lg">
                  <input type="checkbox" id="consent1" className="mt-1 text-primary" />
                  <label htmlFor="consent1" className="text-sm leading-relaxed">
                    I give consent for my child to undergo digital visual perception assessment and understand that this evaluation will help determine appropriate educational and therapeutic interventions.
                  </label>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-accent-light rounded-lg">
                  <input type="checkbox" id="consent2" className="mt-1 text-primary" />
                  <label htmlFor="consent2" className="text-sm leading-relaxed">
                    I authorize sharing of assessment results with the school/educational institution and relevant therapists/specialists for the purpose of developing appropriate support plans.
                  </label>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                  <input type="checkbox" id="consent3" className="mt-1 text-primary" />
                  <label htmlFor="consent3" className="text-sm leading-relaxed">
                    I confirm that all information provided is accurate and complete to the best of my knowledge.
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button 
              type="submit" 
              className="px-12 py-3 text-lg font-semibold text-primary-foreground bg-gradient-to-r from-primary to-primary-dark rounded-lg hover:from-primary-dark hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 shadow-lg"
            >
              Submit Assessment Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisualPerceptionForm;