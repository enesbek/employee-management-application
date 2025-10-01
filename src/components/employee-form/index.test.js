import {expect, fixture, html, oneEvent} from '@open-wc/testing';
import './index.js';

describe('EmployeeForm', () => {
  it('should dispatch employee-save event and show alert on submit', async () => {
    const employee = {
      firstName: 'Ahmet',
      lastName: 'Ak',
      dateOfEmployment: '2022-01-01',
      dateOfBirth: '1990-01-01',
      phone: '+905551112233',
      email: 'ahmet@ak.com',
      department: 'Tech',
      position: 'Senior',
    };

    const el = await fixture(
      html`<employee-form .employee=${employee}></employee-form>`
    );

    el.t = (key) => key;
    window.alert = () => {};
    const form = el.shadowRoot.querySelector('form');

    setTimeout(() =>
      form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}))
    );

    const event = await oneEvent(el, 'employee-save');

    expect(event.detail.firstName).to.equal(employee.firstName);
    expect(event.detail.lastName).to.equal(employee.lastName);
    expect(event.detail.dateOfEmployment).to.equal(employee.dateOfEmployment);
    expect(event.detail.dateOfBirth).to.equal(employee.dateOfBirth);
    expect(event.detail.phone).to.equal(employee.phone);
    expect(event.detail.email).to.equal(employee.email);
    expect(event.detail.department).to.equal(employee.department);
    expect(event.detail.position).to.equal(employee.position);
  });

  it('should call t for all labels and options', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    let calledKeys = [];
    el.t = (key) => {
      calledKeys.push(key);
      return key;
    };

    await el.requestUpdate();

    el.render();

    expect(calledKeys).to.include.members([
      'firstName',
      'lastName',
      'dateOfEmployment',
      'dateOfBirth',
      'phone',
      'email',
      'department',
      'position',
      'pleaseSelect',
      'save',
      'cancel',
    ]);
  });
});
