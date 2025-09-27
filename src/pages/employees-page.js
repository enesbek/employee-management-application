import {LitElement, html} from 'lit';

export class Employees extends LitElement {
  render() {
    return html`<h1>Employees Page</h1>`;
  }
}

customElements.define('employees-page', Employees);
