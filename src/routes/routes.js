// pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Live from '~/pages/Live';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Video from '~/pages/Video';
import Upload from '~/pages/Upload';

// Layouts
import { SidebarSmall, EmptyLayout, HeaderOnly } from '~/layouts';

import configs from '~/configs';

const publicRoutes = [
  { path: configs.routes.home, component: Home },
  { path: configs.routes.following, component: Following },
  { path: configs.routes.live, component: Live },
  { path: configs.routes.profile, component: Profile, layout: SidebarSmall },
  { path: configs.routes.search, component: Search, layout: null },
  { path: configs.routes.video, component: Video, layout: EmptyLayout },
  { path: configs.routes.upload, component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
