import {html, LitElement} from 'lit';
import {Router} from '@vaadin/router';
import './components/app-header/index.js';
import './components/main.js';
import './pages/employees-page.js';
import './pages/add-new-employee.js';

export class AppRoot extends LitElement {
  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet);
    router.setRoutes([
      {path: '/', component: 'employees-page'},
      {path: '/add-new-employee', component: 'add-new-employee'},
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
