// pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Live from '~/pages/Live';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Video from '~/pages/Video';

// Layouts
import { SidebarSmall } from '~/layouts';
import EmptyLayout from '~/layouts/EmptyLayout';

import configs from '~/configs';

const publicRoutes = [
  { path: configs.routes.home, component: Home },
  { path: configs.routes.following, component: Following },
  { path: configs.routes.live, component: Live },
  { path: configs.routes.profile, component: Profile, layout: SidebarSmall },
  { path: configs.routes.search, component: Search, layout: null },
  { path: configs.routes.video, component: Video, layout: EmptyLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
