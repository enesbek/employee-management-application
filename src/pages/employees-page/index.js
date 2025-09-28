import {html} from 'lit';
import '../../components/pages-header/index.js';
import '../../components/employee-list/index.js';
import {BaseElement} from '../../components/base-element/index.js';
import {employeePageStyles} from './styles.js';
import {fetchEmployees} from '../../api/employeesApi.js';

export class EmployeesPage extends BaseElement {
  static properties = {
    view: {type: String},
    employees: {type: Array},
    currentPage: {type: Number},
    pageSize: {type: Number},
    total: {type: Number},
    loading: {type: Boolean},
  };

  static styles = employeePageStyles;

  constructor() {
    super();
    this.view = 'list';
    this.employees = [];
    this.currentPage = 1;
    this.pageSize = 9;
    this.total = 0;
  }

  _onViewChange(e) {
    this.view = e.detail.view;
  }

  connectedCallback() {
    super.connectedCallback();
    this.getEmployees();
  }

  async getEmployees() {
    try {
      this.loading = true;

      const data = await fetchEmployees({
        page: this.currentPage,
        pageSize: this.pageSize,
      });

      this.employees = [...data.users];
      this.total = data.total;
    } catch (err) {
      console.error('Employees API fetch error:', err);
      this.employees = [];
      this.total = 0;
    } finally {
      this.loading = false;
    }
  }

  get totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }

  changePage(page) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.getEmployees();
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

        ${this.loading
          ? html`<div class="loading">Loading...</div>`
          : html`
              ${this.view === 'list'
                ? html`<employee-list
                    .employees=${this.employees}
                  ></employee-list>`
                : html`<div>Grid View Placeholder</div>`}
            `}

        <div class="pagination">
          <button
            class="left"
            @click=${() => this.changePage(this.currentPage - 1)}
            ?disabled=${this.currentPage === 1}
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>

          ${(() => {
            const pages = [];
            const total = this.totalPages;
            const current = this.currentPage;

            if (total <= 5) {
              for (let i = 1; i <= total; i++) pages.push(i);
            } else {
              if (current <= 3) {
                pages.push(1, 2, 3, 4, 5, '...', total);
              } else if (current >= total - 2) {
                pages.push(1, '...', total - 3, total - 2, total - 1, total);
              } else {
                pages.push(
                  1,
                  '...',
                  current - 1,
                  current,
                  current + 1,
                  '...',
                  total
                );
              }
            }

            return pages.map((page) =>
              page === '...'
                ? html`<span class="ellipsis">...</span>`
                : html`
                    <button
                      class=${page === this.currentPage ? 'active' : ''}
                      @click=${() => this.changePage(page)}
                      ?disabled=${page === this.currentPage}
                    >
                      ${page}
                    </button>
                  `
            );
          })()}

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
