// import { Route } from 'react-router';
// import { Routes } from 'react-router-dom';
// import Layout from '../components/Layout/Layout';
// import Dashboard from '../Pages/Dashboard/Dashboard';
// import { pageRoutes } from './pageRoutes';
// import ProfitReport from 'src/Pages/ProfitReport/ProfitReport';
// import GameUser from 'src/Pages/GameUser/GameUser';
// import RedeemRecord from 'src/Pages/GameUser/RedeemRecord/RedeemRecord';
// import RechargeRecord from 'src/Pages/GameUser/RechargeRecord/RechargeRecord';
// import GameRecords from 'src/Pages/GameUser/GameRecords/GameRecords';

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route
//         path={pageRoutes.dashboard}
//         element={
//           <Layout>
//             <Dashboard />
//           </Layout>
//         }
//       ></Route>
//       <Route
//         path={pageRoutes.profitReport}
//         element={
//           <Layout>
//             <ProfitReport />
//           </Layout>
//         }
//       ></Route>
//       <Route
//         path={pageRoutes.userProfile}
//         element={
//           <Layout>
//             <GameUser />
//           </Layout>
//         }
//       ></Route>
//       <Route
//         path={pageRoutes.redeemRecord}
//         element={
//           <Layout>
//             <RedeemRecord />
//           </Layout>
//         }
//       ></Route>
//       <Route
//         path={pageRoutes.rechargeRecord}
//         element={
//           <Layout>
//             <RechargeRecord />
//           </Layout>
//         }
//       ></Route>
//       <Route
//         path={pageRoutes.gameRecord}
//         element={
//           <Layout>
//             <GameRecords />
//           </Layout>
//         }
//       ></Route>
//     </Routes>
//   );
// }

import { Text } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignIN from 'src/Pages/Sign/SignIN';
import { useAuth } from 'src/components/AuthProvider/AuthProvider';
import Layout from 'src/components/Layout/Layout';
import { ProtectedRoute } from './ProtectedRoute';
import { pageRoutes } from './pageRoutes';
import Dashboard from 'src/Pages/Dashboard/Dashboard';
import ProfitReport from 'src/Pages/ProfitReport/ProfitReport';
import GameUser from 'src/Pages/GameUser/GameUser';
import RedeemRecord from 'src/Pages/GameUser/RedeemRecord/RedeemRecord';
import RechargeRecord from 'src/Pages/GameUser/RechargeRecord/RechargeRecord';
import GameRecords from 'src/Pages/GameUser/GameRecords/GameRecords';

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  // const routesForPublic = [
  //   {
  //     path: '/service',
  //     element: <div>Service Page</div>,
  //   },
  //   {
  //     path: '/about-us',
  //     element: <div>About Us</div>,
  //   },
  // ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: pageRoutes.dashboard,
          element: (
            <Layout>
              {' '}
              <Dashboard />
            </Layout>
          ),
        },
        {
          path: pageRoutes.profitReport,
          element: (
            <Layout>
              {' '}
              <ProfitReport />
            </Layout>
          ),
        },
        {
          path: pageRoutes.userProfile,
          element: (
            <Layout>
              {' '}
              <GameUser />
            </Layout>
          ),
        },
        {
          path: pageRoutes.redeemRecord,
          element: (
            <Layout>
              {' '}
              <RedeemRecord />
            </Layout>
          ),
        },
        {
          path: pageRoutes.rechargeRecord,
          element: (
            <Layout>
              {' '}
              <RechargeRecord />
            </Layout>
          ),
        },
        {
          path: pageRoutes.gameRecord,
          element: (
            <Layout>
              {' '}
              <GameRecords />
            </Layout>
          ),
        },
        // {
        //   path: '/profile',
        //   element: <div>User Profile</div>,
        // },
        // {
        //   path: '/logout',
        //   element: <div>Logout</div>,
        // },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    // {
    //   path: '/',
    //   element: <div>Home Page</div>,
    // },
    {
      path: '/',
      element: (
        // <Layout>
        <SignIN />
        // </Layout>
      ),
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    // ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
