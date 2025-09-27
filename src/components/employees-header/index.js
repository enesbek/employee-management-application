import {html} from 'lit';
import {employeesHeaderStyles} from './styles.js';
import {BaseElement} from '../base-element/index.js';

export default class EmployeesHeader extends BaseElement {
  static properties = {
    view: {type: String},
  };

  static styles = employeesHeaderStyles;

  constructor() {
    super();
    this.view = 'list';
  }

  _setView(view) {
    this.view = view;
    this.dispatchEvent(
      new CustomEvent('view-change', {
        detail: {view},
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      />
      <div class="employees-header">
        <div class="employees-header__title">${this.t('employeeList')}</div>
        <div class="employees-header__actions">
          <button
            class="view-button ${this.view === 'list' ? 'active' : ''}"
            @click=${() => this._setView('list')}
          >
            <i class="fa-solid fa-bars"></i>
          </button>
          <button
            class="view-button ${this.view === 'card' ? 'active' : ''}"
            @click=${() => this._setView('card')}
          >
            <i class="fa-solid fa-table-cells"></i>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('employees-header', EmployeesHeader);
