const apiRoutes = {
  login: '/auth/login',
  addUser: '/users',

  // getTokenByPassword: '/api/getTokenByPassword',
  // getProfile: '/api/getProfile',
  // getUserList: '/api/getUserList',
  // appointment: '/api/appointment/:id',
  // getServices: '/api/getServices',
  // getCarDetail: '/api/getCarDetail/:id',
  // getInsurance: '/api/getInsurance/:id',
  // job: '/api/job/:id?',
};

const pageRoutes = {
  dashboard: '/',
  profitReport: '/profit-report',
  userProfile: '/user',
  redeemRecord: '/redeem-record',
  rechargeRecord: '/recharge-record',
  gameRecord: '/game-record',
  allRoute: '*',
};

const formatAsChildRoute = (url: string, parentUrl: string) => {
  return url.replace(parentUrl, '').substring(1);
};

export { pageRoutes, apiRoutes, formatAsChildRoute };
