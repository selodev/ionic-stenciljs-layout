import { Component, Host, h, Prop } from '@stencil/core';
import { menuItems } from '../../../../global/routes';

@Component({
  tag: 'app-layout',
  styleUrl: 'app-layout.css',
  shadow: false,
})
export class AppLayout {
  //@Prop() pageName: string;
  @Prop() paneDisabled;
  render() {
    return (
      <Host>
        <ion-split-pane contentId="main-page" disabled={this.paneDisabled}>
          <ion-menu contentId="main-page" type="overlay" side="start">
            <ion-header>
              <ion-toolbar color="primary">
                <ion-title>Start Menu</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content>
              <app-menu-items menuItems={menuItems} />
            </ion-content>
          </ion-menu>
          <div class="ion-page" id="main-page">
            <app-nav menuItems={menuItems}></app-nav>
            
            <ion-nav class="app-layout-nav"></ion-nav>
          </div>
          <slot></slot>
        </ion-split-pane>
      </Host>
    );
  }
}
