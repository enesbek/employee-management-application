import {LitElement, html} from 'lit';
import '../../components/employee-form/index.js';
import '../../components/pages-header/index.js';
import {newEmployeeStyles} from './styles.js';

export class AddNewEmployee extends LitElement {
  static styles = newEmployeeStyles;

  handleAdd(e) {
    const newEmployee = e.detail;
    console.log('New Employee Added:', newEmployee);
  }

  render() {
    return html` <div class="new-employee-page">
      <pages-header title="addNewEmployee" .showActions=${false}></pages-header>
      <employee-form @employee-save=${this.handleAdd}></employee-form>
    </div>`;
  }
}

customElements.define('add-new-employee', AddNewEmployee);
