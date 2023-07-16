const pageRoutes = {
  dashboard: '/',
  profitReport: '/profit-report',
  userProfile: '/user',
  allRoute: '*',
};

const formatAsChildRoute = (url: string, parentUrl: string) => {
  return url.replace(parentUrl, '').substring(1);
};

export { pageRoutes, formatAsChildRoute };
