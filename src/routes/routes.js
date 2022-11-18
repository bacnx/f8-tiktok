// pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Live from '~/pages/Live';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';

// Layouts
import { HeaderOnly } from '~/layouts';

import configs from '~/configs';

const publicRoutes = [
  { path: configs.routes.home, component: Home },
  { path: configs.routes.following, component: Following },
  { path: configs.routes.live, component: Live },
  { path: configs.routes.profile, component: Profile, layout: HeaderOnly },
  { path: configs.routes.search, component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
