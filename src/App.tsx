import { useRoutes } from 'react-router-dom';
import Layout from './components/layout';
import GameScreen from './pages/visualAttention';
import Home from './pages/home';
import VisualMemory from './pages/visualMemory';
import VisualDiscrimination from './pages/visualDiscrimination';
import FormConstancy from './pages/visualFormConstancy';
import VisualFigureGround from './pages/visualFigureGround';
import VisualClosure from './pages/visualClosure';
import SpatialResolution from './pages/allocentric';
import Topography from './pages/visualTopography';
import GlobalMotion from './pages/globalMotion';
import VisualPerceptionForm from './pages/register';


const App = () => {
  const routes = useRoutes([
    { path: '/home', element: <Home /> },
    { path: '/register', element: <VisualPerceptionForm /> },
    { path: '/va', element: <GameScreen/> },
    { path: '/vm', element: <VisualMemory/> },
    { path: '/vd', element: <VisualDiscrimination/> },
    { path: '/fc', element: <FormConstancy/> },
    { path: '/vfg', element: <VisualFigureGround/> },
    { path: '/vc', element: <VisualClosure/> },
    { path: '/spatial', element: <SpatialResolution/> },
    { path: '/top', element: <Topography/> },
    { path: '/gmp', element: <GlobalMotion/> },
    
    { path: '*', element: <div>404 - Page Not Found</div> },
  ]);

  return <Layout>{routes}</Layout>;
};

export default App;
