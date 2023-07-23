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

export { pageRoutes, formatAsChildRoute };
