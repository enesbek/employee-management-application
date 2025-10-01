import {expect, fixture, html} from '@open-wc/testing';
import './index.js';
import {useEmployeesStore} from '../../store/employeesStore.js';

const mockStore = {
  employees: [{id: 1, firstName: 'Ali'}],
  currentPage: 1,
  loading: false,
  setPage: () => {},
  getEmployees: () => {},
  selectEmployee: () => {},
  deleteEmployee: async () => {},
};
const mockSubscribe = () => () => {};
const mockSelectTotalPages = () => 1;
const mockSelectHasNextPage = () => false;
const mockSelectHasPreviousPage = () => false;

useEmployeesStore.getState(mockStore);
useEmployeesStore.subscribe(mockSubscribe);
useEmployeesStore.selectTotalPages = mockSelectTotalPages;
useEmployeesStore.selectHasNextPage = mockSelectHasNextPage;
useEmployeesStore.selectHasPreviousPage = mockSelectHasPreviousPage;

describe('EmployeesPage', () => {
  it('should render pages-header', async () => {
    const el = await fixture(html`<employees-page></employees-page>`);

    expect(el.shadowRoot.querySelector('pages-header')).to.exist;
  });

  it('should show loading spinner when loading is true', async () => {
    useEmployeesStore.getState = () => ({
      ...mockStore,
      loading: true,
    });

    const el = await fixture(html`<employees-page></employees-page>`);

    expect(el.shadowRoot.querySelector('.loading')).to.exist;
  });

  it('should change view on view-change event', async () => {
    const el = await fixture(html`<employees-page></employees-page>`);
    el._onViewChange({detail: {view: 'card'}});

    expect(el.view).to.equal('card');
  });

  it('should call setPage on valid page change', async () => {
    let calledPage = null;
    useEmployeesStore.getState = () => ({
      ...mockStore,
      setPage: (p) => {
        calledPage = p;
      },
      currentPage: 2,
    });

    useEmployeesStore.selectTotalPages = () => 3;
    const el = await fixture(html`<employees-page></employees-page>`);
    el._handlePageChange(3);

    expect(calledPage).to.equal(3);
  });

  it('should not call setPage on invalid page change', async () => {
    let called = false;
    useEmployeesStore.getState = () => ({
      ...mockStore,
      setPage: () => {
        called = true;
      },
      currentPage: 1,
    });

    useEmployeesStore.selectTotalPages = () => 2;
    const el = await fixture(html`<employees-page></employees-page>`);
    el._handlePageChange(0);

    expect(called).to.be.false;
  });

  it('should call deleteEmployee and handle success in _handleDeleteEmployee', async () => {
    let deletedId = null;
    useEmployeesStore.getState = () => ({
      ...mockStore,
      deleteEmployee: async (id) => {
        deletedId = id;
      },
    });

    const el = await fixture(html`<employees-page></employees-page>`);
    await el._handleDeleteEmployee({detail: {id: 5}});

    expect(deletedId).to.equal(5);
  });

  it('should handle error in _handleDeleteEmployee', async () => {
    useEmployeesStore.getState = () => ({
      ...mockStore,
      deleteEmployee: async () => {
        throw new Error('fail');
      },
    });

    const el = await fixture(html`<employees-page></employees-page>`);
    let alertMsg = '';
    window.alert = (msg) => {
      alertMsg = msg;
    };
    await el._handleDeleteEmployee({detail: {id: 1}});

    expect(alertMsg).to.include('Failed');
  });

  it('should call selectEmployee in _handleEditEmployee', async () => {
    let selected = null;
    useEmployeesStore.getState = () => ({
      ...mockStore,
      selectEmployee: (emp) => {
        selected = emp;
      },
    });

    const el = await fixture(html`<employees-page></employees-page>`);
    el._handleEditEmployee({detail: {id: 7}});

    expect(selected).to.deep.equal({id: 7});
  });

  it('should render correct pagination buttons for small page count', async () => {
    useEmployeesStore.selectTotalPages = () => 3;
    useEmployeesStore.getState = () => ({
      ...mockStore,
      currentPage: 2,
    });

    const el = await fixture(html`<employees-page></employees-page>`);
    const buttons = el._renderPaginationButtons();

    expect(buttons.length).to.equal(7);
  });

  it('should render ellipsis in pagination for large page count', async () => {
    useEmployeesStore.selectTotalPages = () => 10;
    useEmployeesStore.getState = () => ({
      ...mockStore,
      currentPage: 1,
    });

    const el = await fixture(html`<employees-page></employees-page>`);
    const buttons = el._renderPaginationButtons();

    expect(buttons.some((b) => b.strings && b.strings[0].includes('...'))).to.be
      .true;
  });
});
