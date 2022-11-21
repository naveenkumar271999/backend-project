/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import AuthGuard from 'src/components/AuthGuard';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/user/all" />
  },
  {
    exact: true,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '/user',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/user',
        component: () => <Redirect to="/user/all" />
      },
      {
        exact: true,
        path: '/user/all',
        component: lazy(() => import('src/views/company/Alluser'))
      },
      {
        exact: true,
        path: '/user/me',
        component: lazy(() => import('src/views/company/Post'))
      },
      {
        exact: true,
        path: '/app/company/review/:companyId',
        component: lazy(() => import('src/views/company/Review/CompanyRewiew'))
      },
      {
        exact: true,
        path: '/app/chat',
        component: lazy(() => import('src/views/chat/ChatView'))
      },
    ]
  }
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<></>}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
