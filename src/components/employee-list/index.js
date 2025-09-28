import {LitElement, html} from 'lit';
import {employeeListStyles} from './styles';

export default class EmployeeList extends LitElement {
  static styles = employeeListStyles;

  static properties = {
    employees: {type: Array},
  };

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      />
      <table>
        <thead>
          <tr>
            <th class="select-icon"><i class="fa-regular fa-square"></i></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Employment</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${(this.employees || []).map(
            (employee) => html`
              <tr>
                <td class="select-icon">
                  <i class="fa-regular fa-square"></i>
                </td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td class="thin">${employee.dateOfEmployment || 'N/A'}</td>
                <td class="thin">${employee.birthDate}</td>
                <td class="thin">${employee.phone}</td>
                <td class="thin">${employee.email}</td>
                <td class="thin">${employee.company?.department || 'N/A'}</td>
                <td class="thin">${employee.company?.title || 'N/A'}</td>
                <td class="actions">
                  <i class="fa-regular fa-pen-to-square"></i>
                  <i class="fa-solid fa-trash"></i>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
