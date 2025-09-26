import {css, html, LitElement} from 'lit';

export class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      font-family: Arial, sans-serif;
    }
  `;

  render() {
    return html`
      <h1>Employee Management App</h1>
    `;
  }
}

customElements.define('app-root', AppRoot);
