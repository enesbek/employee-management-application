import {LitElement, html} from 'lit';
import {employeeFormStyles} from './styles';

export class EmployeeForm extends LitElement {
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
      <form @submit=${this.handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          .value=${this.employee?.firstName ?? ''}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          .value=${this.employee?.lastName ?? ''}
          required
        />
        <input
          type="date"
          name="dateOfEmployment"
          placeholder="Date of Employment"
          .value=${this.employee?.dateOfEmployment ?? ''}
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          .value=${this.employee?.dateOfBirth ?? ''}
          required
        />
        <input
          name="phone"
          placeholder="Phone Number"
          .value=${this.employee?.phone ?? ''}
          pattern="^+?d{7,15}$"
          title="Enter a valid phone number"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          .value=${this.employee?.email ?? ''}
          required
        />
        <select
          name="department"
          .value=${this.employee?.department ?? ''}
          required
        >
          <option value="" disabled>Select Department</option>
          <option value="Analytics">Analytics</option>
          <option value="Tech">Tech</option>
        </select>
        <select
          name="position"
          .value=${this.employee?.position ?? ''}
          required
        >
          <option value="" disabled>Select Position</option>
          <option value="Junior">Junior</option>
          <option value="Medior">Medior</option>
          <option value="Senior">Senior</option>
        </select>
        <button type="submit">
          ${this.employee ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
