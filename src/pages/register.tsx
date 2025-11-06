import { useState } from 'react';
import UserDetails from '../components/parentDetails';
import BirthAndMedicalInfo from '../components/birthMedicalInfo';
import DevelopmentalDisorderInfo from '../components/developmental';

const INDIAN_LANGUAGES: string[] = [
  "English",
  "Assamese",
  "Bengali",
  "Bodo",
  "Dogri",
  "Gujarati",
  "Hindi",
  "Kannada",
  "Kashmiri",
  "Konkani",
  "Maithili",
  "Malayalam",
  "Manipuri (Meitei)",
  "Marathi",
  "Nepali",
  "Odia",
  "Punjabi",
  "Sanskrit",
  "Santali",
  "Sindhi",
  "Tamil",
  "Telugu",
  "Urdu"
];

const VisualPerceptionForm = () => {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [customLanguage, setCustomLanguage] = useState<string>("");
  const [Reading, setReading] = useState("")
  const [customReading, setCustomReading] = useState<string>("");  
  const [Writing, setWriting] = useState("")
  const [customWriting, setCustomWriting] = useState<string>("");
  const [othersEye, setOthersEye] = useState(false);
  const [othersEar, setOthersEar] = useState(false);
  const [hasSiblings, setHasSiblings] = useState<string>("No");
  const [visionProblem, setVisionProblem] = useState<string>("Absent");
  const [residentialType, setResidentialType] = useState<string>("Rural");

  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>)=>{
     const value = e.target.value;
   if (value !== "Others") {
    setSelectedLanguage(value);
    setCustomLanguage(""); // clear any previous custom input
  } else {
    setSelectedLanguage("Others"); // show text box for custom entry
  }
  }
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customValue = e.target.value;
    setCustomLanguage(customValue);
  };

    const handleReading = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value !== "Others") {
      setReading(value);
      setCustomReading("");
    } else {
      setReading("Others");
    }
  };

  const handleCustomReading = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customValue = e.target.value;
    setCustomReading(customValue);
  };

  const handleWriting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value !== "Others") {
      setWriting(value);
      setCustomWriting("");
    } else {
      setWriting("Others");
    }
  };

  const handleCustomWriting = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customValue = e.target.value;
    setCustomWriting(customValue);
  };
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
    const h = parseFloat(height) / 100; // convert cm → meters
    const w = parseFloat(weight)*10;
    const bmiValue = w / (h * h); // BMI formula: weight(kg) / height(m)^2
    setBmi(bmiValue.toFixed(2)); // round to 2 decimal places
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
                <h1 className="text-2xl md:text-3xl font-bold"> Registration Form </h1>
              </div>
              <p className="text-primary-foreground/90">
                Comprehensive developmental and visual perception evaluation
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div className="bg-white rounded-lg shadow-md border-l-4 border-l-primary">
            <div className="p-6 border-b border-form-border">
              <h2 className="text-xl font-semibold text-form-header flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
               Examiner Profile
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="Examiner_name" className="block text-sm font-medium text-gray-700">Examiner name *</label>
                  <input 
                    type="text" 
                    id="Examiner_name" 
                    placeholder="Enter Examiner name" 
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="examiner_profession" className="block text-sm font-medium text-gray-700">Examiner Profession *</label>
                  <input 
                    type="text" 
                    id="examiner_profession" 
                    placeholder="Enter Examiner Profession" 
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
           </div>
          </div>
          {/* Personal Details */}
          <div className="bg-white rounded-lg shadow-md border-l-4 border-l-primary">
            <div className="p-6 border-b border-form-border">
              <h2 className="text-xl font-semibold text-form-header flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Demographic Profile
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="Examiner_name" className="block text-sm font-medium text-gray-700">Examiner name *</label>
                  <input 
                    type="text" 
                    id="Examiner_name" 
                    placeholder="Enter Examiner name" 
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="examiner_profession" className="block text-sm font-medium text-gray-700">Examiner Profession *</label>
                  <input 
                    type="text" 
                    id="examiner_profession" 
                    placeholder="Enter Examiner Profession" 
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
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
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">Medium of Instruction in School *</label>
                <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={selectedLanguage}
                    onChange={handleLanguage}
                >
                  <option value="">Select primary language</option>
                    {INDIAN_LANGUAGES.map((lang) =>
                    (
                      <option value={lang}>{lang}</option>
                    ))
                    }
                    <option value="Others">Other</option>
                  </select>
                  {selectedLanguage === 'Others' && (
                    <input 
                      type="text" 
                      id="language"
                      value={customLanguage} 
                      onChange={handleCustomChange}
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  )}
              </div>

              <div className="space-y-2">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">Medium of Instruction in School *</label>
                <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={selectedLanguage}
                    onChange={handleLanguage}
                >
                  <option value="">Select primary language</option>
                    {INDIAN_LANGUAGES.map((lang) =>
                    (
                      <option value={lang}>{lang}</option>
                    ))
                    }
                    <option value="Others">Other</option>
                  </select>
                  {selectedLanguage === 'Others' && (
                    <input 
                      type="text" 
                      id="language"
                      value={customLanguage} 
                      onChange={handleCustomChange}
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  )}
              </div>
              <div className="space-y-2">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">language Comprehension in Reading *</label>
                <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={Reading}
                    onChange={handleReading}
                >
                  <option value="">Select primary language</option>
                    {INDIAN_LANGUAGES.map((lang) =>
                    (
                      <option value={lang}>{lang}</option>
                    ))
                    }
                    <option value="Others">Other</option>
                  </select>
                  {Reading === 'Others' && (
                    <input 
                      type="text" 
                      id="language"
                      value={customReading} 
                      onChange={handleCustomReading}
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  )}
              </div>
              <div className="space-y-2">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">language Comprehension in Writing *</label>
                <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={Writing}
                    onChange={handleWriting}
                >
                  <option value="">Select primary language</option>
                    {INDIAN_LANGUAGES.map((lang) =>
                    (
                      <option value={lang}>{lang}</option>
                    ))
                    }
                    <option value="Others">Other</option>
                  </select>
                  {Writing === 'Others' && (
                    <input 
                      type="text" 
                      id="language"
                      value={customWriting} 
                      onChange={handleCustomWriting}
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  )}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-form-header mb-3">Physical Information</h4>
                <div className="grid md:grid-cols-2 gap-4"></div>
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
                        <span className={`inline-block px-2 py-1 rounded text-xs text-green-500 ${getBMICategory(parseFloat(bmi)).color}`}>
                          {getBMICategory(parseFloat(bmi)).category}
                        </span>
                      </div>
                    )}
                    {!bmi && <span className="text-muted-foreground text-sm">Enter height & weight</span>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="visionStatus" className="block text-sm font-medium text-gray-700">Vision Status</label>
                  <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">Select vision status</option>
                    <option value="normal">Normal</option>
                    <option value="not Assessed yet">Needs Checkup</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Visual Aids</label>
                  <div className="flex items-center space-x-2 p-3 border border-input-border rounded-md">
                    <input type="checkbox" id="glasses" className="text-primary" />
                    <label htmlFor="glasses" className="text-sm">Wears Glasses</label>
                    <input type="checkbox" id="lenses" className="text-primary" />
                    <label htmlFor="lenses" className="text-sm">Wears Contact Lenses</label>
                    <input type="checkbox" id="OthersEye" className="text-primary" checked={othersEye} onChange={(e)=>setOthersEye(e.target.checked)}/>
                    <label htmlFor="OthersEye" className="text-sm">others</label>
                    { othersEye && (
                      <input
                        type="text"
                        placeholder="Please specify"
                        className="border rounded-md px-2 py-1 text-sm outline-none"
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="HearingStatus" className="block text-sm font-medium text-gray-700">Hearing Status</label>
                  <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">Select Hearing status</option>
                    <option value="normal">Normal</option>
                    <option value="not Assessed yet">Needs Checkup</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Hearing Aids</label>
                  <div className="flex items-center space-x-2 p-3 border border-input-border rounded-md">
                    <input type="checkbox" id="glasses" className="text-primary" />
                    <label htmlFor="glasses" className="text-sm">Wears Hearing Aids</label>
                    <input type="checkbox" id="othersEar" className="text-primary" checked={othersEar} onChange={(e)=>setOthersEar(e.target.checked)}/>
                    <label htmlFor="othersEar" className="text-sm">others</label>
                    { othersEar && (
                      <input
                        type="text"
                        placeholder="Please specify"
                        className="border rounded-md px-2 py-1 text-sm outline-none"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-form-header mb-3">3. Family Demographic Profile</h4>
                <div className="space-y-2">
                  <label htmlFor="breadwinner" className="block text-sm font-medium text-gray-700">Breadwinner of the Family</label>
                  <select className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">Select</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="mt-3">
                    <UserDetails sectionTitle='Father Details'></UserDetails>
                </div>
                <div className="mt-3">
                    <UserDetails sectionTitle='Mothers Details'></UserDetails>
                </div>
                <div className="mt-3">
                    <UserDetails sectionTitle='Guardian Details'></UserDetails>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-md space-y-4 mt-6 border border-gray-200">
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">
                    Additional Personal Details
                  </h2>

                  {/* Siblings */}
                  <div className="flex flex-col">
                    <label className="font-medium mb-1">Siblings:</label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="siblings"
                          value="Yes"
                          checked={hasSiblings === "Yes"}
                          onChange={() => setHasSiblings("Yes")}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="siblings"
                          value="No"
                          checked={hasSiblings === "No"}
                          onChange={() => setHasSiblings("No")}
                        />
                        <span>No</span>
                      </label>
                    </div>

                    {hasSiblings === "Yes" && (
                      <div className="flex flex-col md:flex-row md:space-x-4 mt-2">
                        <div className="flex-1 flex flex-col">
                          <label className="font-medium mb-1">Sibling Type:</label>
                          <select className="border rounded-lg px-3 py-2">
                            <option value="">Select Type</option>
                            <option>Older</option>
                            <option>Younger</option>
                            <option>Both</option>
                          </select>
                        </div>
                        <div className="flex-1 flex flex-col mt-3 md:mt-0">
                          <label className="font-medium mb-1">Number of Siblings:</label>
                          <input
                            type="number"
                            placeholder="Enter number"
                            className="border rounded-lg px-3 py-2"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vision Problems */}
                  <div className="flex flex-col">
                    <label className="font-medium mb-1">History of Vision Problems:</label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="vision"
                          value="Present"
                          checked={visionProblem === "Present"}
                          onChange={() => setVisionProblem("Present")}
                        />
                        <span>Present</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="vision"
                          value="Absent"
                          checked={visionProblem === "Absent"}
                          onChange={() => setVisionProblem("Absent")}
                        />
                        <span>Absent</span>
                      </label>
                    </div>
                  </div>

                  {/* Illness History */}
                  <div className="flex flex-col">
                    <label className="font-medium mb-1">
                      History of Other Illness (specify):
                    </label>
                    <textarea
                      placeholder="Enter illness details if any"
                      className="border rounded-lg px-3 py-2"
                    ></textarea>
                  </div>

                  {/* Marital Status */}
                  <div className="flex flex-col">
                    <label className="font-medium mb-1">Marital Status:</label>
                    <select className="border rounded-lg px-3 py-2">
                      <option value="">Select Status</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Divorced</option>
                      <option>Separated</option>
                    </select>
                  </div>

                  {/* Socioeconomic Status */}
                  <div className="flex flex-col">
                    <label className="font-medium mb-1">Socioeconomic Status:</label>
                    <select className="border rounded-lg px-3 py-2">
                      <option value="">Select Status</option>
                      <option>Upper</option>
                      <option>Upper Middle</option>
                      <option>Lower Middle</option>
                      <option>Upper Lower</option>
                      <option>Lower</option>
                    </select>
                  </div>

                  {/* Residential Address */}
                  <div className="flex flex-col">
                    <label className="font-medium mb-1">Residential Address:</label>
                    <div className="flex items-center space-x-6 mb-3">
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="residentialType"
                          value="Rural"
                          checked={residentialType === "Rural"}
                          onChange={() => setResidentialType("Rural")}
                        />
                        <span>Rural</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="residentialType"
                          value="Urban"
                          checked={residentialType === "Urban"}
                          onChange={() => setResidentialType("Urban")}
                        />
                        <span>Urban</span>
                      </label>
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-4">
                      <div className="flex-1 flex flex-col">
                        <label className="font-medium mb-1">Permanent Address:</label>
                        <textarea
                          placeholder="Enter permanent address"
                          className="border rounded-lg px-3 py-2"
                        ></textarea>
                      </div>
                      <div className="flex-1 flex flex-col mt-3 md:mt-0">
                        <label className="font-medium mb-1">Local Address:</label>
                        <textarea
                          placeholder="Enter local address"
                          className="border rounded-lg px-3 py-2"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Information */}
          <div className="bg-white ">
            <BirthAndMedicalInfo></BirthAndMedicalInfo>
          </div>
      

          {/* School Details */}
          <div className="bg-white rounded-lg shadow-md border-l-4 border-l-warning">
            <div className="p-6 border-b border-form-border">
              <h4 className="text-lg font-semibold text-black flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                6. School Profile
              </h4>
            </div>

            <div className="p-6 space-y-4 text-black">
              {/* School Name */}
              <div className="space-y-2">
                <label htmlFor="schoolName" className="block text-sm font-medium text-black">School Name *</label>
                <input
                  type="text"
                  id="schoolName"
                  placeholder="Enter school name"
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Class & Section */}
              <div className="space-y-2">
                <label htmlFor="classSection" className="block text-sm font-medium text-black">Class & Section *</label>
                <input
                  type="text"
                  id="classSection"
                  placeholder="e.g., Grade 5-A"
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* School Address */}
              <div className="space-y-2">
                <label htmlFor="schoolAddress" className="block text-sm font-medium text-black">School Address</label>
                <textarea
                  id="schoolAddress"
                  placeholder="Enter school address"
                  rows={2}
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>

              {/* Type of Education */}
              <div className="space-y-2">
                <label htmlFor="educationType" className="block text-sm font-medium text-black">Type of Education</label>
                <select
                  id="educationType"
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="mainstream">Mainstream</option>
                  <option value="special">Special Education</option>
                  <option value="inclusive">Inclusive</option>
                </select>
              </div>

              {/* If Mainstream */}
              <div className="space-y-2">
                <label htmlFor="schoolType" className="block text-sm font-medium text-black">If Mainstream, specify</label>
                <select
                  id="schoolType"
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select option</option>
                  <option value="government">Government</option>
                  <option value="private">Private</option>
                </select>
              </div>

              {/* Board Type */}
              <div className="space-y-2">
                <label htmlFor="schoolBoard" className="block text-sm font-medium text-black">If Mainstream, specify board</label>
                <select
                  id="schoolBoard"
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select board</option>
                  <option value="state">State Board</option>
                  <option value="cbse">CBSE Board</option>
                  <option value="icse">ICSE Board</option>
                </select>
              </div>

              {/* Support Staff */}
              <div className="space-y-2">
                <label htmlFor="supportStaff" className="block text-sm font-medium text-black">Support Staff Assigned (if any)</label>
                <input
                  type="text"
                  id="supportStaff"
                  placeholder="e.g., Special educator, Aide"
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Screen Use */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Screen use in school setting</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="screenUse" value="yes" className="mr-2" /> Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="screenUse" value="no" className="mr-2" /> No
                  </label>
                </div>
                <input
                  type="number"
                  placeholder="If yes, duration (hours)"
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Purpose of Use */}
              <div className="space-y-2">
                <label htmlFor="purposeUse" className="block text-sm font-medium text-black">Purpose of use</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Watching
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Reading
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Writing
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Others (specify)
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-2  p-6 border-t border-form-border">
                <h3 className="text-lg font-semibold text-gray-800">
                  7. Extracurricular Activities
                </h3>
                <label className="block text-sm font-medium text-gray-700">
                  Participation in extracurricular activities
                </label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-1">
                    <input type="radio" name="extracurricular" value="yes" />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="radio" name="extracurricular" value="no" />
                    <span>No</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="If yes, specify activities"
                  className="w-full mt-2 px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />

              {/* Screen Time at Home */}
              <div className="space-y-2 pt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  8. History of Screentime Exposure at Home
                </h3>
                <label
                  htmlFor="durationHome"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration (in hours)
                </label>
                <input
                  type="number"
                  id="durationHome"
                  placeholder="Enter duration of screen use"
                  className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />

                <label className="block text-sm font-medium text-gray-700">
                  Medium of Exposure
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" id="tv" />
                    <span>TV</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" id="mobile" />
                    <span>Mobiles</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" id="tablet" />
                    <span>Tablets</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" id="computer" />
                    <span>Computers</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" id="otherMedia" />
                    <span>Others</span>
                  </label>
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Purpose of Use
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" id="games" />
                    <span>Online Games</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" id="cartoons" />
                    <span>Watch Cartoons/Shows</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" id="schoolwork" />
                    <span>School Work</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" id="othersUse" />
                    <span>Others (specify)</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="If others, specify"
                  className="w-full mt-2 px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>


          <DevelopmentalDisorderInfo></DevelopmentalDisorderInfo>

          {/* Consent */}
          <div className="bg-white rounded-lg shadow-md border-2 border-primary/20">
            <div className="p-6 border-b border-form-border">
              <h4 className="text-lg font-semibold text-black">7. Consent & Authorization</h4>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-100 rounded-lg">
                  <input type="checkbox" id="consent1" className="mt-1 text-primary" />
                  <label htmlFor="consent1" className="text-sm leading-relaxed text-black">
                    I give consent for my child to undergo the Digitalized Comprehensive Visual Perception Assessment-Children (DCVPA-C).
                  </label>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-100 rounded-lg">
                  <input type="checkbox" id="consent2" className="mt-1 text-primary" />
                  <label htmlFor="consent2" className="text-sm leading-relaxed text-black">
                    I give consent to use the assessment results for clinical, academic, and/or research purposes.
                  </label>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-100 rounded-lg">
                  <input type="checkbox" id="consent3" className="mt-1 text-primary" />
                  <label htmlFor="consent3" className="text-sm leading-relaxed text-black">
                    I confirm that all information provided is accurate and complete to the best of my knowledge.
                  </label>
                </div>

                {/* Consent Given By Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <label htmlFor="consentGivenBy" className="block text-sm font-medium text-black mb-1">
                      Consent Given By
                    </label>
                    <input
                      type="text"
                      id="consentGivenBy"
                      name="consentGivenBy"
                      className="w-full border border-gray-400 rounded-md p-2 text-black"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="consentDateTime" className="block text-sm font-medium text-black mb-1">
                      Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      id="consentDateTime"
                      name="consentDateTime"
                      defaultValue={new Date().toISOString().slice(0, 16)}
                      className="w-full border border-gray-400 rounded-md p-2 text-black"
                    />
                  </div>
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