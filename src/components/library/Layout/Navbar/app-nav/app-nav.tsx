import { Component, Host, h, State, Prop, Build } from '@stencil/core';

const QUERY: { [key: string]: string } = {
  xs: '(min-width: 0px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  never: '',
};

@Component({
  tag: 'app-nav',
  styleUrl: 'app-nav.css',
})
export class AppNav {
  @State() mQuery = false;
  @Prop() menuItems;

  componentWillLoad() {
    if (Build.isBrowser) {
      const mediaQuery = window.matchMedia(QUERY['md']);
      // Update the state with the current value
      this.mQuery = mediaQuery.matches;
      // Create an event listener
      const handler = event => {
        this.mQuery = event.matches;
      };
      // Attach the event listener to know when the matches value changes
      mediaQuery.addEventListener('change', handler);
      // Remove the event listener on cleanup
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-title>
              <ion-img
                src="/assets/icon/apple-touch-icon.png"
                style={{ height: '50px' }}
              ></ion-img>
            </ion-title>
            <ion-buttons
              style={{ justifyContent: 'center' }}
              slot={this.mQuery ? '' : 'end'}
            >
              {this.mQuery ? (
                <app-nav-items menuItems={this.menuItems} />
              ) : (
                <ion-menu-button></ion-menu-button>
              )}
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <slot></slot>
      </Host>
    );
  }
}
