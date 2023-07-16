import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Dashboard from '../Pages/Dashboard/Dashboard';
import { pageRoutes } from './pageRoutes';
import ProfitReport from 'src/Pages/ProfitReport/ProfitReport';
import GameUser from 'src/Pages/GameUser/GameUser';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path={pageRoutes.dashboard}
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      ></Route>
      <Route
        path={pageRoutes.profitReport}
        element={
          <Layout>
            <ProfitReport />
          </Layout>
        }
      ></Route>
      <Route
        path={pageRoutes.userProfile}
        element={
          <Layout>
            <GameUser />
          </Layout>
        }
      ></Route>
    </Routes>
  );
}
