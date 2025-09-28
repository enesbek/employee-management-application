import {html} from 'lit';
import '../../components/pages-header/index.js';
import '../../components/employee-list/index.js';
import {BaseElement} from '../../components/base-element/index.js';
import {employees as employeesData} from '../../data/employees.js';
import {employeePageStyles} from './styles.js';

export class EmployeesPage extends BaseElement {
  static properties = {
    view: {type: String},
    employees: {type: Array},
    currentPage: {type: Number},
    pageSize: {type: Number},
  };

  static styles = employeePageStyles;

  constructor() {
    super();
    this.view = 'list';
    this.employees = [];
    this.currentPage = 1;
    this.pageSize = 9;
  }

  _onViewChange(e) {
    this.view = e.detail.view;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchEmployees();
  }

  async fetchEmployees() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    this.employees = employeesData;
  }

  get totalPages() {
    return Math.ceil(this.employees.length / this.pageSize);
  }

  changePage(page) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.employees.slice(start, start + this.pageSize);
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      />
      <div class="employees-page">
        <pages-header
          .view=${this.view}
          @view-change=${this._onViewChange}
          title="employeeList"
          showActions=${true}
        ></pages-header>

        ${this.view === 'list'
          ? html`<employee-list
              .employees=${this.paginatedEmployees}
            ></employee-list>`
          : html`<div>Grid View Placeholder</div>`}

        <div class="pagination">
          <button
            class="left"
            @click=${() => this.changePage(this.currentPage - 1)}
            ?disabled=${this.currentPage === 1}
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          ${Array.from({length: this.totalPages}, (_, i) => i + 1).map(
            (page) => {
              let cls = '';
              if (page === this.currentPage) cls = 'active';
              else if (page < this.currentPage) cls = 'left';
              else cls = 'right';

              return html`
                <button
                  class=${cls}
                  @click=${() => this.changePage(page)}
                  ?disabled=${page === this.currentPage}
                >
                  ${page}
                </button>
              `;
            }
          )}

          <button
            class="right"
            @click=${() => this.changePage(this.currentPage + 1)}
            ?disabled=${this.currentPage === this.totalPages}
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('employees-page', EmployeesPage);
