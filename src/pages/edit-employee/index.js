import {LitElement, html} from 'lit';
import '../../components/employee-form/index.js';
import '../../components/pages-header/index.js';
import {editEmployeeStyles} from './styles.js';
import {useEmployeesStore} from '../../store/employeesStore.js';

export class EditEmployeePage extends LitElement {
  static properties = {
    employeeId: {type: Number},
    employee: {type: Object},
  };

  static styles = editEmployeeStyles;

  connectedCallback() {
    super.connectedCallback();

    const match = window.location.pathname.match(/\/employees\/(\d+)\/edit/);
    if (match) {
      this.employeeId = Number(match[1]);
      const state = useEmployeesStore.getState();
      this.employee = state.employees.find((e) => e.id === this.employeeId);
    }
  }

  handleSave(e) {
    const updated = e.detail;
    useEmployeesStore.getState().updateEmployee(this.employeeId, updated);
    console.log(updated);
    history.back();
  }

  render() {
    return html`
      <div class="edit-employee-page">
        <pages-header title="editEmployee" .showActions=${false}></pages-header>
        <employee-form
          .employee=${this.employee}
          @employee-save=${this.handleSave}
        ></employee-form>
      </div>
    `;
  }
}

customElements.define('edit-employee-page', EditEmployeePage);
