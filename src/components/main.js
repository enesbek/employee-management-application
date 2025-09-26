import {LitElement, html, css} from 'lit';

export class AppMain extends LitElement {
  static styles = css`
    .main {
      background-color: #ededed;
      height: 90vh;
      width: 100vw;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html` <div class="main">Employee Management App</div> `;
  }
}

customElements.define('app-main', AppMain);
