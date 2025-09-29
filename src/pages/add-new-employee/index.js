import {LitElement, html} from 'lit';
import '../../components/employee-form/index.js';
import '../../components/pages-header/index.js';
import {newEmployeeStyles} from './styles.js';
import {useEmployeesStore} from '../../store/employeesStore.js';

export class AddNewEmployee extends LitElement {
  static styles = newEmployeeStyles;

  handleAdd(e) {
    const newEmployee = e.detail;
    useEmployeesStore.getState().addEmployee(newEmployee);
  }

  handleCancel() {
    history.back();
  }

  render() {
    return html`
      <div class="new-employee-page">
        <pages-header
          title="addNewEmployee"
          .showActions=${false}
        ></pages-header>
        <employee-form
          @employee-save=${this.handleAdd}
          @employee-cancel=${this.handleCancel}
        ></employee-form>
      </div>
    `;
  }
}

customElements.define('add-new-employee', AddNewEmployee);
