import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Dashboard from '../Pages/Dashboard/Dashboard';
import { pageRoutes } from './pageRoutes';
import ProfitReport from 'src/Pages/ProfitReport/ProfitReport';
import GameUser from 'src/Pages/GameUser/GameUser';
import RedeemRecord from 'src/Pages/GameUser/RedeemRecord/RedeemRecord';
import RechargeRecord from 'src/Pages/GameUser/RechargeRecord/RechargeRecord';
import GameRecords from 'src/Pages/GameUser/GameRecords/GameRecords';

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
      <Route
        path={pageRoutes.redeemRecord}
        element={
          <Layout>
            <RedeemRecord />
          </Layout>
        }
      ></Route>
      <Route
        path={pageRoutes.rechargeRecord}
        element={
          <Layout>
            <RechargeRecord />
          </Layout>
        }
      ></Route>
      <Route
        path={pageRoutes.gameRecord}
        element={
          <Layout>
            <GameRecords />
          </Layout>
        }
      ></Route>
    </Routes>
  );
}
