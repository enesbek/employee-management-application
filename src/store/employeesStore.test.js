import {expect} from '@open-wc/testing';
import {
  useEmployeesStore,
  selectTotalPages,
  selectHasNextPage,
  selectHasPreviousPage,
} from './employeesStore.js';

describe('employeesStore', () => {
  afterEach(() => {
    useEmployeesStore.getState().reset();
  });

  it('should set and get employees', () => {
    useEmployeesStore.setState({
      employees: [{id: 1, firstName: 'Ahmet'}],
      total: 1,
    });

    const state = useEmployeesStore.getState();

    expect(state.employees).to.deep.equal([{id: 1, firstName: 'Ahmet'}]);
    expect(state.total).to.equal(1);
  });

  it('should set page and call getEmployees', async () => {
    let called = false;
    useEmployeesStore.setState({
      getEmployees: async () => {
        called = true;
      },
    });

    await useEmployeesStore.getState().setPage(2);

    expect(useEmployeesStore.getState().currentPage).to.equal(2);
    expect(called).to.be.true;
  });

  it('should set page size and call getEmployees', async () => {
    let called = false;
    useEmployeesStore.setState({
      getEmployees: async () => {
        called = true;
      },
    });

    await useEmployeesStore.getState().setPageSize(5);

    expect(useEmployeesStore.getState().pageSize).to.equal(5);
    expect(useEmployeesStore.getState().currentPage).to.equal(1);
    expect(called).to.be.true;
  });

  it('should set search query and call getEmployees', async () => {
    let called = false;
    useEmployeesStore.setState({
      getEmployees: async () => {
        called = true;
      },
    });

    await useEmployeesStore.getState().setSearchQuery('Ahmet');

    expect(useEmployeesStore.getState().searchQuery).to.equal('Ahmet');
    expect(useEmployeesStore.getState().currentPage).to.equal(1);
    expect(called).to.be.true;
  });

  it('should select employee', () => {
    const employee = {id: 1, firstName: 'Ahmet'};
    useEmployeesStore.getState().selectEmployee(employee);

    expect(useEmployeesStore.getState().selectedEmployee).to.deep.equal(
      employee
    );
  });

  it('should reset state', () => {
    useEmployeesStore.setState({
      employees: [{id: 1}],
      currentPage: 3,
      total: 10,
      loading: true,
      error: 'err',
      selectedEmployee: {id: 1},
    });

    useEmployeesStore.getState().reset();
    const state = useEmployeesStore.getState();

    expect(state.employees).to.deep.equal([]);
    expect(state.currentPage).to.equal(1);
    expect(state.total).to.equal(0);
    expect(state.loading).to.be.false;
    expect(state.error).to.be.null;
    expect(state.selectedEmployee).to.be.null;
  });

  it('should calculate total pages', () => {
    useEmployeesStore.setState({total: 20, pageSize: 5});
    const state = useEmployeesStore.getState();

    expect(selectTotalPages(state)).to.equal(4);
  });

  it('should return has next/previous page', () => {
    useEmployeesStore.setState({total: 20, pageSize: 5, currentPage: 1});

    let state = useEmployeesStore.getState();

    expect(selectHasNextPage(state)).to.be.true;
    expect(selectHasPreviousPage(state)).to.be.false;

    useEmployeesStore.setState({currentPage: 4});
    state = useEmployeesStore.getState();

    expect(selectHasNextPage(state)).to.be.false;
    expect(selectHasPreviousPage(state)).to.be.true;
  });
});
