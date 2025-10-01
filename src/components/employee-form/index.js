import {html} from 'lit';
import {Router} from '@vaadin/router';
import {employeeFormStyles} from './styles';
import {BaseElement} from '../base-element';

export class EmployeeForm extends BaseElement {
  static properties = {
    employee: {type: Object},
    successMessage: {type: String},
  };

  constructor() {
    super();
    this.successMessage = '';
  }

  static styles = employeeFormStyles;

  handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const employeeData = Object.fromEntries(formData.entries());

    if (this.employee?.id) {
      employeeData.id = this.employee.id;
    }

    this.dispatchEvent(
      new CustomEvent('employee-save', {
        detail: employeeData,
        bubbles: true,
        composed: true,
      })
    );

    alert(
      this.t(employeeData.id ? 'employeeUpdatedAlert' : 'employeeSavedAlert')
    );
    Router.go('/');
  }

  handleCancel() {
    this.dispatchEvent(
      new CustomEvent('employee-cancel', {
        bubbles: true,
        composed: true,
      })
    );
    this.shadowRoot.querySelector('form').reset();
  }

  render() {
    const isEdit = !!this.employee;

    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      />
      ${isEdit
        ? html`<p class="edit-form-desc-text">
            ${this.t('editEmployeeText')}
            ${this.employee.firstName + ' ' + this.employee.lastName}
          </p>`
        : ''}
      <form @submit=${this.handleSubmit}>
        <div class="field">
          <label for="firstName">${this.t('firstName')}</label>
          <input
            name="firstName"
            .value=${this.employee?.firstName ?? ''}
            type="text"
            required
          />
        </div>

        <div class="field">
          <label for="lastName">${this.t('lastName')}</label>
          <input
            name="lastName"
            type="text"
            .value=${this.employee?.lastName ?? ''}
            required
          />
        </div>

        <div class="field">
          <label for="dateOfEmployment">${this.t('dateOfEmployment')}</label>
          <input
            type="date"
            name="dateOfEmployment"
            .value=${this.employee?.dateOfEmployment ?? ''}
            required
          />
        </div>

        <div class="field">
          <label for="dateOfBirth">${this.t('dateOfBirth')}</label>
          <input
            type="date"
            name="dateOfBirth"
            .value=${this.employee?.dateOfBirth ?? ''}
            required
          />
        </div>

        <div class="field">
          <label for="phone">${this.t('phone')}</label>
          <input
            type="tel"
            name="phone"
            .value=${this.employee?.phone ?? ''}
            pattern="^+?d{7,15}$"
            title="Enter a valid phone number"
            required
          />
        </div>

        <div class="field">
          <label for="email">${this.t('email')}</label>
          <input
            type="email"
            name="email"
            .value=${this.employee?.email ?? ''}
            required
          />
        </div>

        <div class="field">
          <label for="department">${this.t('department')}</label>
          <select
            name="department"
            type="text"
            .value=${this.employee?.department ?? ''}
            required
          >
            <option value="Analytics">Analytics</option>
            <option value="Tech">Tech</option>
          </select>
        </div>

        <div class="field">
          <label for="position">${this.t('position')}</label>
          <select
            name="position"
            type="text"
            .value=${this.employee?.position ?? ''}
            required
          >
            <option value="" disabled>${this.t('pleaseSelect')}</option>
            <option value="Junior">Junior</option>
            <option value="Medior">Mid Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div class="buttons-row">
          <div class="btns">
            <button type="submit" class="btn-save">
              ${isEdit ? this.t('update') : this.t('save')}
            </button>
            <button
              type="button"
              class="btn-cancel"
              @click=${this.handleCancel}
            >
              ${this.t('cancel')}
            </button>
          </div>
        </div>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
