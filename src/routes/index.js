// pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';

// Layouts
import { HeaderOnly } from '~/layouts';

import routesConfig from '~/configs/routes';

const publicRoutes = [
  { path: routesConfig.home, component: Home },
  { path: routesConfig.following, component: Following },
  { path: routesConfig.profile, component: Profile, layout: HeaderOnly },
  { path: routesConfig.search, component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
