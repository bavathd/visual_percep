import { useRoutes } from 'react-router-dom';
import Layout from './components/layout';
import GameScreen from './pages/visualAttention';
import Home from './pages/home';
import VisualMemory from './pages/visualMemory';
import VisualDiscrimination from './pages/visualDiscrimination';
import FormConstancy from './pages/visualFormConstancy';
import VisualFigureGround from './pages/visualFigureGround';
import VisualClosure from './pages/visualClosure';
import Allocentric from './pages/allocentric';
import Egocentric from './pages/egocentric';
import Topography from './visualTopography';
import GlobalMotion from './pages/globalMotion';
import LocalMotion from './pages/localMotion';


const App = () => {
  const routes = useRoutes([
    { path: '/home', element: <Home /> },
    { path: '/va', element: <GameScreen/> },
    { path: '/vm', element: <VisualMemory/> },
    { path: '/vd', element: <VisualDiscrimination/> },
    { path: '/fc', element: <FormConstancy/> },
    { path: '/vfg', element: <VisualFigureGround/> },
    { path: '/vc', element: <VisualClosure/> },
    { path: '/allo', element: <Allocentric/> },
    { path: '/ego', element: <Egocentric/> },
    { path: '/top', element: <Topography/> },
    { path: '/gmp', element: <GlobalMotion/> },
    { path: '/lmp', element: <LocalMotion/> },
    
    { path: '*', element: <div>404 - Page Not Found</div> },
  ]);

  return <Layout>{routes}</Layout>;
};

export default App;
