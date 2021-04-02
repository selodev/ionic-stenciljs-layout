import { Component, Host, h, Prop, State, Method } from '@stencil/core';
import { popoverController } from '@ionic/core';

@Component({
  tag: 'app-nav-items',
  styleUrl: 'app-nav-items.css',
  shadow: false,
})
export class AppNavItems {
  @State() expanded = {};
  @Prop() menuItems;
  @Prop() isChildren;
  @Prop() level = 0;
  @State() popover: any;
  updateDropDown(level) {
    this.expanded = {
      ...this.expanded,
      [level]: this.expanded[level] ? !this.expanded[level] : true,
    };
  }
  async presentPopover(ev: any, level, menuChildren) {
    this.updateDropDown(level);

    this.popover = await popoverController.create({
      component: 'app-nav-sub-menu-items',
      cssClass: 'app-nav-items-popover-class',
      event: ev,
      translucent: true,
      componentProps: {
        menuItems: menuChildren,
      },
    });

    this.popover.onDidDismiss().then(() => {
      this.updateDropDown(level);
    });

    return await this.popover.present();
  }
  @Method()
  async dismissPopover() {
    return await this.popover.dismiss();
  }
  render() {
    return (
      <Host>
        {this.menuItems.map((menuItem, index) => {
          const {
            name: menuName,
            url: menuUrl,
            children: menuChildren,
          } = menuItem;
          const level = `level-${this.level}-${index}`;
          let expanded = this.expanded[level];
          return [
            menuChildren ? (
              [
                <NavButton name={menuName} url={menuUrl} />,
                <NavButtonToggle
                  onClickHandler={async ev => {
                    await this.presentPopover(ev, level, menuChildren);
                  }}
                  expanded={expanded}
                />,
              ]
            ) : (
              <NavButton name={menuName} url={menuUrl} />
            ),
          ];
        })}
        <slot></slot>
      </Host>
    );
  }
}

const NavButton = ({ name, url }, children) => (
  <ion-button size="small" fill="clear" href={url}>
    {name}
    {children}
  </ion-button>
);

const NavButtonToggle = ({ onClickHandler, expanded }) => (
  <ion-button
    size="small"
    fill="clear"
    onClick={ev => {
      onClickHandler(ev);
      ev.stopPropagation();
      ev.preventDefault();
    }}
  >
    <ion-icon
      size="small"
      slot="icon-only"
      color="primary"
      name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'}
    ></ion-icon>
  </ion-button>
);
