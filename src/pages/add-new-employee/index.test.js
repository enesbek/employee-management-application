import {expect, fixture, html} from '@open-wc/testing';
import './index.js';
import {useEmployeesStore} from '../../store/employeesStore.js';

describe('AddNewEmployee', () => {
  it('should render pages-header and employee-form', async () => {
    const el = await fixture(html`<add-new-employee></add-new-employee>`);

    expect(el.shadowRoot.querySelector('pages-header')).to.exist;
    expect(el.shadowRoot.querySelector('employee-form')).to.exist;
  });

  it('should call addEmployee on employee-save event', async () => {
    const el = await fixture(html`<add-new-employee></add-new-employee>`);

    const employee = {firstName: 'Ahmet', lastName: 'Ak'};
    let called = false;

    useEmployeesStore.getState = () => ({
      addEmployee: (emp) => {
        called = true;
        expect(emp).to.deep.equal(employee);
      },
    });

    el.handleAdd({detail: employee});
    expect(called).to.be.true;
  });

  it('should go back in history on employee-cancel event', async () => {
    const el = await fixture(html`<add-new-employee></add-new-employee>`);

    let called = false;

    window.history.back = () => {
      called = true;
    };

    el.handleCancel();
    expect(called).to.be.true;
  });
});
