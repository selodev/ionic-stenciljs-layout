import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-page-2',
  styleUrl: 'app-page-2.css',
  shadow: false,
})
export class AppPage2 {
  render() {
    return (
      <Host>
        {[
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>Page 2</ion-title>
            </ion-toolbar>
          </ion-header>,

          <ion-content class="ion-padding">
            <p>
              Page 2 to the PWA Toolkit. You can use this starter to build
              entire apps with web components using Stencil and ionic/core!
              Check out the README for everything that comes in this starter out
              of the box and check out our docs on{' '}
              <a href="https://stenciljs.com">stenciljs.com</a> to get started.
            </p>

          </ion-content>,
        ]}
        <slot></slot>
      </Host>
    );
  }
}
