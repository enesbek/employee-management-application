import {expect, fixture, html} from '@open-wc/testing';
import './index.js';

describe('EditEmployeePage', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/employees/1/edit');
  });

  it('should render pages-header and employee-form', async () => {
    const el = await fixture(html`<edit-employee-page></edit-employee-page>`);

    expect(el.shadowRoot.querySelector('pages-header')).to.exist;
    expect(el.shadowRoot.querySelector('employee-form')).to.exist;
  });
});
