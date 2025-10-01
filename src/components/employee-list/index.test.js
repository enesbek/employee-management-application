// components/employee-list/index.test.js
import {expect, fixture, html} from '@open-wc/testing';
import {Router} from '@vaadin/router';
import {useEmployeesStore} from '../../store/employeesStore.js';
import './index.js';

describe('EmployeeList', () => {
  const mockEmployees = [
    {
      id: 1,
      firstName: 'Ahmet',
      lastName: 'Ak',
      email: 'ahmet@ak.com',
      phone: '+905551112233',
      birthDate: '1990-01-01',
      dateOfEmployment: '2020-01-01',
      company: {
        department: 'Tech',
        title: 'Junior',
      },
    },
    {
      id: 2,
      firstName: 'Ayse',
      lastName: 'Sari',
      email: 'ayse@sari.com',
      phone: '+905551112233',
      birthDate: '1992-02-02',
      dateOfEmployment: '2021-02-02',
      company: {
        department: 'Tech',
        title: 'Senior',
      },
    },
  ];

  let deleteCalls = [];
  let searchCalls = [];

  beforeEach(() => {
    deleteCalls = [];
    searchCalls = [];
    useEmployeesStore.getState = () => ({
      deleteEmployee: (id) => deleteCalls.push(id),
      setSearchQuery: (q) => searchCalls.push(q),
    });
  });

  it('should navigate to edit page on handleEdit', async () => {
    const el = await fixture(html`
      <employee-list .employees=${mockEmployees}></employee-list>
    `);
    let calledPath = null;
    const origGo = Router.go;
    Router.go = (path) => {
      calledPath = path;
    };
    const penIcon = el.shadowRoot.querySelector('.fa-pen-to-square');
    penIcon.click();
    expect(calledPath).to.equal(`/employees/1/edit`);
    Router.go = origGo;
  });

  it('should confirm single delete', async () => {
    const el = await fixture(html`
      <employee-list .employees=${mockEmployees}></employee-list>
    `);

    el.selectedEmployee = mockEmployees[0];
    el.handleConfirmDelete();

    expect(deleteCalls).to.deep.equal([1]);
    expect(el.selectedEmployee).to.be.null;
    expect(el.showDeleteModal).to.be.false;
  });

  it('should confirm batch delete', async () => {
    const el = await fixture(html`
      <employee-list .employees=${mockEmployees}></employee-list>
    `);

    el.selectedEmployees = [1, 2];
    el.isBatchDelete = true;
    el.handleConfirmDelete();

    expect(deleteCalls).to.have.members([1, 2]);
    expect(el.selectedEmployees).to.deep.equal([]);
  });

  it('should trigger search when searchInput has value', async () => {
    const el = await fixture(html`
      <employee-list .employees=${mockEmployees}></employee-list>
    `);

    el.activeSearchColumn = 'firstName';
    el.searchInput = 'Ahmet';
    el.search();

    expect(searchCalls).to.deep.equal(['Ahmet']);
  });

  it('should toggle employee selection', async () => {
    const el = await fixture(html`
      <employee-list .employees=${mockEmployees}></employee-list>
    `);

    el.toggleSelect(1);
    expect(el.selectedEmployees).to.include(1);

    el.toggleSelect(1);
    expect(el.selectedEmployees).to.not.include(1);
  });

  it('should toggle select all employees', async () => {
    const el = await fixture(html`
      <employee-list .employees=${mockEmployees}></employee-list>
    `);

    el.toggleSelectAll();
    expect(el.selectedEmployees).to.have.members([1, 2]);

    el.toggleSelectAll();
    expect(el.selectedEmployees).to.deep.equal([]);
  });

  it('should cancel delete modal', async () => {
    const el = await fixture(html`
      <employee-list .employees=${mockEmployees}></employee-list>
    `);

    el.showDeleteModal = true;
    el.handleCancelDelete();

    expect(el.showDeleteModal).to.be.false;
    expect(el.selectedEmployee).to.be.null;
  });
});
