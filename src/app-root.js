import {css, html, LitElement} from 'lit';
import {Router} from '@vaadin/router';
import './components/app-header/index.js';
import './pages/employees-page/index.js';
import './pages/add-new-employee/index.js';
import './pages/edit-employee/index.js';

export class AppRoot extends LitElement {
  static styles = css`
    #outlet {
      height: 100%;
      max-height: calc(100vh - 40px);
      overflow-y: auto;
    }
  `;

  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet, {useHash: true});
    router.setRoutes([
      {path: '/', component: 'employees-page'},
      {path: '/add-new-employee', component: 'add-new-employee'},
      {path: '/employees/:id/edit', component: 'edit-employee-page'},
    ]);
  }

  render() {
    return html`
      <app-header></app-header>
      <main id="outlet"></main>
    `;
  }
}

customElements.define('app-root', AppRoot);
