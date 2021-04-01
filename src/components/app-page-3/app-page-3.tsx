import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-page-3',
  styleUrl: 'app-page-3.css',
})
export class AppPage3 {
  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Page 3</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          Page 3 to the PWA Toolkit. You can use this starter to build entire
          apps with web components using Stencil and ionic/core! Check out the
          README for everything that comes in this starter out of the box and
          check out our docs on{' '}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>
      </ion-content>,
    ];
  }
}
