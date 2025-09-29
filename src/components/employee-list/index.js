import {html} from 'lit';
import {employeeListStyles} from './styles';
import {Router} from '@vaadin/router';
import {BaseElement} from '../base-element';
import '../../components/delete-modal/index.js';

export default class EmployeeList extends BaseElement {
  static styles = employeeListStyles;

  static properties = {
    employees: {type: Array},
    selectedEmployee: {type: Object},
    showDeleteModal: {type: Boolean},
  };

  constructor() {
    super();
    this.employees = [];
    this.selectedEmployee = null;
    this.showDeleteModal = false;
  }

  handleEdit(employee) {
    Router.go(`/employees/${employee.id}/edit`);
  }

  handleDeleteClick(employee) {
    this.selectedEmployee = employee;
    this.showDeleteModal = true;
  }

  handleConfirmDelete(e) {
    this.dispatchEvent(
      new CustomEvent('delete-employee', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );

    this.showDeleteModal = false;
    this.selectedEmployee = null;
  }

  handleCancelDelete() {
    this.showDeleteModal = false;
    this.selectedEmployee = null;
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      />

      <delete-modal
        .isOpen=${this.showDeleteModal}
        .employee=${this.selectedEmployee}
        @confirm-delete=${this.handleConfirmDelete}
        @cancel-delete=${this.handleCancelDelete}
      ></delete-modal>

      <table>
        <thead>
          <tr>
            <th class="select-icon"><i class="fa-regular fa-square"></i></th>
            <th>${this.t('firstName')}</th>
            <th>${this.t('lastName')}</th>
            <th>${this.t('dateOfEmployment')}</th>
            <th>${this.t('dateOfBirth')}</th>
            <th>${this.t('phone')}</th>
            <th>${this.t('email')}</th>
            <th>${this.t('department')}</th>
            <th>${this.t('position')}</th>
            <th>${this.t('actions')}</th>
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
                  <i
                    class="fa-regular fa-pen-to-square"
                    @click=${() => this.handleEdit(employee)}
                  ></i>
                  <i
                    class="fa-solid fa-trash"
                    @click=${() => this.handleDeleteClick(employee)}
                  ></i>
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
