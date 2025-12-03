import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const regId = localStorage.getItem("CURRENT_VPD_ID");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Registration Successful!
      </h1>

      <p className="text-lg mb-6 text-black">
        Your Registration ID: <span className="font-bold">{regId}</span>
      </p>

      <button
        onClick={() => navigate("/va")}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg"
      >
        Start Assessment
      </button>
    </div>
  );
};

export default WelcomePage;
