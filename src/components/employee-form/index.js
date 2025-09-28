import {html} from 'lit';
import {employeeFormStyles} from './styles';
import {BaseElement} from '../base-element';

export class EmployeeForm extends BaseElement {
  static properties = {
    employee: {type: Object},
  };

  static styles = employeeFormStyles;

  handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const employee = Object.fromEntries(formData.entries());

    this.dispatchEvent(new CustomEvent('employee-save', {detail: employee}));
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      />
      <form action="#" method="post" aria-label="örnek form">
        <!-- 8 input alanı -->
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
            type="email"
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
          <input
            name="department"
            .value=${this.employee?.department ?? ''}
            required
            type="text"
          />
        </div>

        <div class="field">
          <label for="position">${this.t('position')}</label>
          <select
            name="position"
            type="text"
            .value=${this.employee?.position ?? ''}
            required
          >
            <option value="" disabled>Select Position</option>
            <option value="Junior">Junior</option>
            <option value="Medior">Mid Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <!-- Buttons that are the same width as a single column and centered -->
        <div class="buttons-row">
          <div class="btns">
            <button type="submit" class="btn-save">
              ${this.employee ? this.t('updateEmployee') : this.t('save')}
            </button>
            <button
              type="button"
              class="btn-cancel"
              onclick="document.querySelector('form').reset();"
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
