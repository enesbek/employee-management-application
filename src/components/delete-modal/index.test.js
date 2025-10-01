import {expect, fixture, html} from '@open-wc/testing';
import './index.js';

describe('DeleteModal', () => {
  it('should render when open', async () => {
    const employee = {
      id: 1,
    };

    const el = await fixture(html`
      <delete-modal .isOpen=${true} .employee=${employee}> </delete-modal>
    `);
    const overlay = el.shadowRoot.querySelector('.modal-overlay');

    expect(overlay).to.exist;
  });

  it('should not render when closed', async () => {
    const el = await fixture(html`
      <delete-modal .isOpen=${false}></delete-modal>
    `);
    const overlay = el.shadowRoot.querySelector('.modal-overlay');

    expect(overlay).to.be.null;
  });

  it('should dispatch confirm-delete event on delete button click', async () => {
    const employee = {id: 1};

    const el = await fixture(html`
      <delete-modal .isOpen=${true} .employee=${employee}> </delete-modal>
    `);
    let eventFired = false;
    let eventDetail = null;
    el.addEventListener('confirm-delete', (e) => {
      eventFired = true;
      eventDetail = e.detail;
    });
    const deleteButton = el.shadowRoot.querySelector('.button-delete');
    deleteButton.click();

    expect(eventFired).to.be.true;
    expect(eventDetail).to.deep.equal(employee);
  });

  it('should close on ESC key press', async () => {
    const el = await fixture(html`
      <delete-modal .isOpen=${true}></delete-modal>
    `);

    let eventFired = false;
    el.addEventListener('cancel-delete', () => {
      eventFired = true;
    });
    const event = new KeyboardEvent('keydown', {key: 'Escape'});
    window.dispatchEvent(event);
    await el.updateComplete;

    expect(eventFired).to.be.true;
  });

  it('should close on overlay click', async () => {
    const el = await fixture(html`
      <delete-modal .isOpen=${true}></delete-modal>
    `);

    let eventFired = false;
    el.addEventListener('cancel-delete', () => {
      eventFired = true;
    });

    const overlay = el.shadowRoot.querySelector('.modal-overlay');
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(clickEvent, 'target', {
      value: overlay,
      enumerable: true,
    });
    Object.defineProperty(clickEvent, 'currentTarget', {
      value: overlay,
      enumerable: true,
    });

    overlay.dispatchEvent(clickEvent);
    await el.updateComplete;

    expect(eventFired).to.be.true;
  });
});
