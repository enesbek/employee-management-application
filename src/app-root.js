import {html, LitElement} from 'lit';
import './components/header.js';
import './components/main.js';

export class AppRoot extends LitElement {
  render() {
    return html`
      <app-header></app-header>
      <app-main></app-main>
    `;
  }
}

customElements.define('app-root', AppRoot);
