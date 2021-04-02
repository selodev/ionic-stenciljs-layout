import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'app-nav-sub-menu-items',
  styleUrl: 'app-nav-sub-menu-items.css',
  shadow: false,
})
export class AppNavSubMenuItems {
  @State() expanded = {};
  @Prop() menuItems = [];
  @Prop() level = 0;
  updateDropDown(level) {
    this.expanded = {
      ...this.expanded,
      [level]: this.expanded[level] ? !this.expanded[level] : true,
    };
  }

  render() {
    return (
      <Host>
        {this.menuItems.map(
          ({ name: menuName, url: menuUrl, children: menuChildren }, index) => {
            const level = `level-${this.level}-${index}`;
            const expanded = this.expanded[level];
            return menuChildren ? (
              <div key={level} id={level}>
                <MenuItem menuName={menuName} menuUrl={menuUrl} marginLeft>
                  {menuChildren && (
                    <MenuItemToggle
                      onClickHandler={() => {
                        this.updateDropDown(level);
                      }}
                      expanded={expanded}
                    />
                  )}
                </MenuItem>
                {menuChildren && (
                  <app-nav-sub-menu-items
                    menuItems={menuChildren}
                    style={{
                      display: expanded ? 'block' : 'none',
                      marginLeft: '16px',
                    }}
                  />
                )}
              </div>
            ) : (
              <MenuItem menuName={menuName} menuUrl={menuUrl} marginLeft />
            );
          },
        )}
        <slot></slot>
      </Host>
    );
  }
}

const MenuItem = ({ menuName, menuUrl, marginLeft }, children) => (
  <ion-item
    href={menuUrl}
    lines="none"
    detail={false}
    onClick={async () => {
      await customElements.whenDefined('app-nav-items');
      const todoListElement = document.querySelector('app-nav-items');
      await todoListElement.dismissPopover();
    }}
  >
    <ion-label class={`${marginLeft && 'margin-left'}`}>{menuName}</ion-label>
    {children}
  </ion-item>
);

const MenuItemToggle = ({ onClickHandler, expanded }) => (
  <ion-button
    size="small"
    fill="clear"
    slot="end"
    onClick={ev => {
      onClickHandler(ev);
      ev.stopImmediatePropagation();
      ev.preventDefault();
    }}
  >
    <ion-icon
      slot="icon-only"
      name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'}
    ></ion-icon>
  </ion-button>
);
