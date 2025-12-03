import { useRoutes } from "react-router-dom";

import Layout from "./components/layout";
import GameScreen from "./pages/visualAttention";
import Home from "./pages/home";
import VisualMemory from "./pages/visualMemory";
import VisualDiscrimination from "./pages/visualDiscrimination";
import FormConstancy from "./pages/visualFormConstancy";
import VisualFigureGround from "./pages/visualFigureGround";
import VisualClosure from "./pages/visualClosure";
import SpatialResolution from "./pages/allocentric";
import Topography from "./pages/visualTopography";
import GlobalMotion from "./pages/globalMotion";
import VisualPerceptionForm from "./pages/register";
import LocalMotion from "./pages/localMotion";
import EyeTrackingVideo from "./pages/visualtracking";
import ScoreCard from "./pages/[scorecard]";
import AdminLogin from "./pages/adminLogin";
import WelcomePage from "./pages/welcomepage";

import ProtectedAdminRoute from "./utils/auth/protectedAdminRoute";
import { AdminAuthProvider } from "./utils/auth/adminAuthProvider";
import ProtectedVPDRoute from "./utils/auth/protectedVPDRoute";
import AdminSignup from "./pages/adminSignup";

const AppRoutes = () => {
  return useRoutes([
    // PUBLIC ROUTE
    { path: "/", element: <AdminLogin /> },
    { path: "/signup", element: <AdminSignup /> },

    // PROTECTED ROUTES
    {
      path: "/home",
      element: (
        <ProtectedAdminRoute>
          <Home />
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/register",
      element: (
        <ProtectedAdminRoute>
          <VisualPerceptionForm />
        </ProtectedAdminRoute>
      ),
    },
    {
      path: "/welcome",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <WelcomePage />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },
    {
      path: "/va",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <GameScreen />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/vm",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <VisualMemory />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/vd",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <VisualDiscrimination />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/fc",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <FormConstancy />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/vfg",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <VisualFigureGround />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/vc",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <VisualClosure />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/spatial",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <SpatialResolution />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/top",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <Topography />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/gmp",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <GlobalMotion />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/lmp",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <LocalMotion />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/vt",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <EyeTrackingVideo />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    {
      path: "/score",
      element: (
        <ProtectedAdminRoute>
          <ProtectedVPDRoute>
            <ScoreCard />
          </ProtectedVPDRoute>
        </ProtectedAdminRoute>
      ),
    },

    { path: "*", element: <div>404 - Page Not Found</div> },
  ]);
};

export default function App() {
  return (
    <AdminAuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AdminAuthProvider>
  );
}
