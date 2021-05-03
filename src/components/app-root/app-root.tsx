import { Component, h } from '@stencil/core';
import { menuRoutes } from '../../global/routes';
import AppRoutes from './AppRoutes';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <AppRoutes routes={menuRoutes} />
        </ion-router>
        <app-layout paneDisabled={false} />
      </ion-app>
    );
  }
}
