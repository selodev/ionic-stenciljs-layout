import {
  Component,
  Host,
  h,
  Element,
  Prop,
  State,
  Watch,
  EventEmitter,
  Event,
} from '@stencil/core';

@Component({
  tag: 'app-img',
  styleUrl: 'app-img.css',
  shadow: true,
})
export class AppImg {
  private io?: IntersectionObserver;
  @Element() el!: HTMLElement;
  @State() loadSrc?: string;
  @State() loadSrcset?: string;
  @State() loadError?: () => void;
  @Prop() alt?: string;
  @Prop() src?: string;
  @Prop() srcset?: string;
  @Prop() sizes?: string;
  @Prop() width?: string;
  @Prop() height?: string;

  @Watch('src')
  srcChanged() {
    this.addIO();
  }
  /** Emitted when the img src has been set */
  @Event() ionImgWillLoad!: EventEmitter<void>;
  /** Emitted when the image has finished loading */
  @Event() ionImgDidLoad!: EventEmitter<void>;
  /** Emitted when the img fails to load */
  @Event() ionError!: EventEmitter<void>;

  componentDidLoad() {
    this.addIO();
  }

  private addIO() {
    if (this.src === undefined) {
      return;
    }
    if (
      typeof (window as any) !== 'undefined' &&
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'isIntersecting' in window.IntersectionObserverEntry.prototype
    ) {
      this.removeIO();
      this.io = new IntersectionObserver(data => {
        if (data[0].isIntersecting) {
          this.load();
          this.removeIO();
        }
      });
      this.io.observe(this.el);
    } else {
      // fall back to setTimeout for Safari and IE
      setTimeout(() => this.load(), 200);
    }
  }

  private removeIO() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  private load() {
    this.loadError = this.onError;
    this.loadSrc = this.src;
    this.loadSrcset = this.srcset;
    this.ionImgWillLoad.emit();
  }

  private onLoad = () => {
    this.ionImgDidLoad.emit();
  };

  private onError = () => {
    this.ionError.emit();
  };

  render() {
    return (
      <Host>
        <img
          decoding="async"
          src={this.loadSrc}
          srcSet={this.loadSrcset}
          sizes={this.sizes}
          alt={this.alt}
          width={this.width}
          height={this.height}
          onLoad={this.onLoad}
          onError={this.loadError}
          part="image"
        />
      </Host>
    );
  }
}
