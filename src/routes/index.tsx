import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Dashboard from '../Pages/Dashboard/Dashboard';
import { pageRoutes } from './pageRoutes';

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
    </Routes>
  );
}
