import {html} from 'lit';
import '../../components/pages-header/index.js';
import '../../components/employee-list/index.js';
import {BaseElement} from '../../components/base-element/index.js';
import {employeePageStyles} from './styles.js';
import {
  useEmployeesStore,
  selectTotalPages,
  selectHasNextPage,
  selectHasPreviousPage,
} from '../../store/employeesStore.js';

export class EmployeesPage extends BaseElement {
  static properties = {
    view: {type: String},
  };

  static styles = employeePageStyles;

  constructor() {
    super();
    this.view = 'list';
    this.unsubscribe = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = useEmployeesStore.subscribe(() => this.requestUpdate());
    useEmployeesStore.getState().getEmployees();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }

  _onViewChange(e) {
    this.view = e.detail.view;
  }

  _handlePageChange(page) {
    const state = useEmployeesStore.getState();
    const totalPages = selectTotalPages(state);

    if (page < 1 || page > totalPages) return;

    state.setPage(page);
  }

  async _handleDeleteEmployee(e) {
    const employee = e.detail;

    try {
      await useEmployeesStore.getState().deleteEmployee(employee.id);
      console.log('Employee deleted successfully:', employee);
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee: ' + error.message);
    }
  }

  _handleEditEmployee(e) {
    const employee = e.detail;
    useEmployeesStore.getState().selectEmployee(employee);
  }

  _renderPaginationButtons() {
    const state = useEmployeesStore.getState();
    const {currentPage} = state;
    const totalPages = selectTotalPages(state);
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
    }

    return pages.map((page) =>
      page === '...'
        ? html`<span class="ellipsis">...</span>`
        : html`
            <button
              class=${page === currentPage ? 'active' : ''}
              @click=${() => this._handlePageChange(page)}
              ?disabled=${page === currentPage}
            >
              ${page}
            </button>
          `
    );
  }

  render() {
    const state = useEmployeesStore.getState();
    const {employees, currentPage, loading} = state;
    const hasPrevious = selectHasPreviousPage(state);
    const hasNext = selectHasNextPage(state);

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

        ${loading
          ? html`<div class="loading">
              <i class="fa-solid fa-spinner fa-spin"></i>
              Loading...
            </div>`
          : html`
              ${this.view === 'list'
                ? html`<employee-list
                    .employees=${employees}
                    @edit-employee=${(e) => this.openEditPage(e.detail)}
                    @delete-employee=${this._handleDeleteEmployee}
                  ></employee-list>`
                : html`<div>
                    Grid view? Not today 😎 Our list is looking awesome, the
                    grid’s just a little jealous… but it’s coming soon, promise
                    (if I get the job)!
                  </div>`}
            `}

        <div class="pagination">
          <button
            class="left"
            @click=${() => this._handlePageChange(currentPage - 1)}
            ?disabled=${!hasPrevious || loading}
            title="Previous page"
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>

          ${this._renderPaginationButtons()}

          <button
            class="right"
            @click=${() => this._handlePageChange(currentPage + 1)}
            ?disabled=${!hasNext || loading}
            title="Next page"
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('employees-page', EmployeesPage);
