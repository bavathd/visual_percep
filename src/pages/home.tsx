import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instructionsPdf from "../assets/Instructions.pdf";

const DASHBOARD_URL = "https://dashboard-visual-o7vv.onrender.com/";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [showDashboard, setShowDashboard] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);

  const openDashboard = () => {
    setFrameLoaded(false);
    setShowDashboard(true);
  };

  if (showDashboard) {
    return (
      <div className="w-screen h-screen flex flex-col bg-white">
        {/* Header */}
        <header className="h-16 border-b bg-white px-6 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setShowDashboard(false)}
            className="text-blue-600 font-medium hover:text-blue-800"
          >
            ← Back
          </button>

          <h1 className="text-xl font-semibold">Dashboard</h1>

          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open in New Tab ↗
          </a>
        </header>

        {/* Dashboard */}
        <div className="flex-1 relative">
          {!frameLoaded && (
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center gap-4 z-10">
              <div className="w-10 h-10 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin"></div>

              <h2 className="text-lg font-semibold text-gray-700">
                Loading Dashboard
              </h2>

              <p className="text-sm text-gray-500">
                First load may take 30–40 seconds.
              </p>
            </div>
          )}

          <iframe
            src={DASHBOARD_URL}
            title="User Dashboard"
            onLoad={() => setFrameLoaded(true)}
            className={`w-full h-full border-0 ${
              frameLoaded ? "block" : "invisible"
            }`}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Welcome */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome</h1>

          <p className="text-xl text-gray-600">
            Digitalized Comprehensive Visual Perception Assessment - Children
          </p>

          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Welcome to the DCVPA-C portal. Please choose one of the options
            below to continue.
          </p>

          <a
            href={instructionsPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            📄 View Instructions
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Registration */}
          <div
            onClick={() => navigate("/register")}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border p-10 hover:border-blue-500"
          >
            <div className="text-6xl mb-6">📝</div>

            <h2 className="text-3xl font-bold mb-3">Registration</h2>

            <p className="text-gray-600 mb-8">
              Register a new participant by completing the assessment
              information.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Start Registration →
            </button>
          </div>

          {/* User Data */}
          <div
            onClick={openDashboard}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border p-10 hover:border-green-500"
          >
            <div className="text-6xl mb-6">📊</div>

            <h2 className="text-3xl font-bold mb-3">Dashboard</h2>

            <p className="text-gray-600 mb-8">
              View participant records, reports, analytics and assessment
              dashboard.
            </p>

            <button
              onClick={openDashboard}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Open Dashboard →
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Digitalized Comprehensive Visual
          Perception - Children Assessment
        </div>
      </div>
    </div>
  );
};

export default Home;
