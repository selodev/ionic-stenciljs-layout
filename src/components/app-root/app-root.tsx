import { Component, h } from '@stencil/core';
import { menuItems } from '../../global/routes';

const appRoutes = routes =>
  routes.map(({ url, children }) => (
    <ion-route url={url} component="page-home">
      {children && appRoutes(children)}
    </ion-route>
  ));
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/profile/:name" component="app-profile" />
          {appRoutes(menuItems)}
        </ion-router>
        <app-layout paneDisabled={false}>
          <ion-nav />
        </app-layout>
      </ion-app>
    );
  }
}
