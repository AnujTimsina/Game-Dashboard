const pageRoutes = {
  dashboard: '/',

  allRoute: '*',
};

const formatAsChildRoute = (url: string, parentUrl: string) => {
  return url.replace(parentUrl, '').substring(1);
};

export { pageRoutes, formatAsChildRoute };
