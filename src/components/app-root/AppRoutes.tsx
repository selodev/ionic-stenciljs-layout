import { h } from '@stencil/core';

const AppRoute = (props, children) => (
  <ion-route url={props.route.url} component={props.route.routeComponent}>
    {children}
  </ion-route>
);

const AppRoutes = props =>
  props.routes.map(route => <AppRoute route={route}></AppRoute>);

export default AppRoutes;
