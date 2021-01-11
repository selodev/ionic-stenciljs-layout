import { Component, Host, h, Prop, State } from '@stencil/core';
import { popoverController } from '@ionic/core';

@Component({
  tag: 'app-nav-sub-menu-items',
  styleUrl: 'app-nav-sub-menu-items.css',
  shadow: true,
})
export class AppNavSubMenuItems {
  @Prop() appPage;
  @Prop() hasChildren;
  @Prop() isChildren;
  @State() show;

  async presentPopover(ev: any) {
    const popover = await popoverController.create({
      component: 'menu-tems',
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        appPages: this.appPage.children,
        hasChildren: this.hasChildren,
      },
    });
    popover.onDidDismiss().then(() => {
      this.show = !this.show;
    });

    return await popover.present();
  }

  render() {
    return (
      <Host>
        <ion-button size="small" fill="clear">
          {this.appPage.name}
          <ion-button
            size="small"
            fill="clear"
            onClick={ev => {
              this.show = !this.show;
              this.presentPopover(ev);
              ev.stopPropagation();
              ev.preventDefault();
            }}
          >
            <ion-icon
              size="small"
              slot="icon-only"
              name={this.show ? 'chevron-up-outline' : 'chevron-down-outline'}
            ></ion-icon>
          </ion-button>
        </ion-button>

        <slot></slot>
      </Host>
    );
  }
}
