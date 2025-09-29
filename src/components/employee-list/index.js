import {html} from 'lit';
import {employeeListStyles} from './styles';
import {Router} from '@vaadin/router';
import {BaseElement} from '../base-element';
import '../../components/delete-modal/index.js';
import {useEmployeesStore} from '../../store/employeesStore.js';

export default class EmployeeList extends BaseElement {
  static styles = employeeListStyles;

  static properties = {
    employees: {type: Array},
    selectedEmployee: {type: Object},
    showDeleteModal: {type: Boolean},
    activeSearchColumn: {type: String},
    searchInput: {type: String},
  };

  constructor() {
    super();
    this.employees = [];
    this.selectedEmployee = null;
    this.showDeleteModal = false;
    this.activeSearchField = null;
    this.activeSearchColumn = null;
    this.searchInput = '';
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

  toggleSearch(column) {
    if (this.activeSearchColumn === column) {
      this.activeSearchColumn = null;
      this.searchInput = '';
    } else {
      this.activeSearchColumn = column;
      this.searchInput = '';
    }
    this.requestUpdate();
  }

  search() {
    if (!this.searchInput) return;
    useEmployeesStore.getState().setSearchQuery(this.searchInput);
  }

  renderSearchInput(column) {
    if (this.activeSearchColumn !== column) return '';
    return html`
      <div class="search-input-wrapper">
        <input
          type="text"
          .value=${this.searchInput}
          @input=${(e) => (this.searchInput = e.target.value)}
          @click=${(e) => e.stopPropagation()}
        />
        <i
          class="fa-solid fa-magnifying-glass button-search"
          @click=${() => this.search()}
        ></i>
      </div>
    `;
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
            <th @click=${() => this.toggleSearch('firstName')}>
              ${this.activeSearchColumn === 'firstName'
                ? this.renderSearchInput('firstName')
                : this.t('firstName')}
            </th>
            <th @click=${() => this.toggleSearch('lastName')}>
              ${this.activeSearchColumn === 'lastName'
                ? this.renderSearchInput('lastName')
                : this.t('lastName')}
            </th>
            <th @click=${() => this.toggleSearch('dateOfEmployment')}>
              ${this.activeSearchColumn === 'dateOfEmployment'
                ? this.renderSearchInput('dateOfEmployment')
                : this.t('dateOfEmployment')}
            </th>
            <th @click=${() => this.toggleSearch('dateOfBirth')}>
              ${this.activeSearchColumn === 'dateOfBirth'
                ? this.renderSearchInput('dateOfBirth')
                : this.t('dateOfBirth')}
            </th>
            <th @click=${() => this.toggleSearch('phone')}>
              ${this.activeSearchColumn === 'phone'
                ? this.renderSearchInput('phone')
                : this.t('phone')}
            </th>
            <th @click=${() => this.toggleSearch('email')}>
              ${this.activeSearchColumn === 'email'
                ? this.renderSearchInput('email')
                : this.t('email')}
            </th>
            <th @click=${() => this.toggleSearch('department')}>
              ${this.activeSearchColumn === 'department'
                ? this.renderSearchInput('department')
                : this.t('department')}
            </th>
            <th @click=${() => this.toggleSearch('position')}>
              ${this.activeSearchColumn === 'position'
                ? this.renderSearchInput('position')
                : this.t('position')}
            </th>
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
