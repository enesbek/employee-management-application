import {expect, fixture, html} from '@open-wc/testing';
import {Router} from '@vaadin/router';
import './index.js';

describe('AppHeader', () => {
  it('should render logo and bank name', async () => {
    const el = await fixture(html`<app-header></app-header>`);

    const img = el.shadowRoot.querySelector('img[alt="Logo"]');
    const bankName = el.shadowRoot.querySelector('.app-header_bank-name');

    expect(img).to.exist;
    expect(bankName.textContent).to.include('ING');
  });

  it('should highlight employees button when on root route', async () => {
    window.history.pushState({}, '', '/');
    const el = await fixture(html`<app-header></app-header>`);

    const btn = el.shadowRoot.querySelectorAll(
      '.app-header_routing-buttons'
    )[0];

    expect(btn.classList.contains('active')).to.be.true;
  });

  it('should highlight add-new-employee button when on add-new-employee route', async () => {
    window.history.pushState({}, '', '/add-new-employee');
    const el = await fixture(html`<app-header></app-header>`);

    const btn = el.shadowRoot.querySelectorAll(
      '.app-header_routing-buttons'
    )[1];

    expect(btn.classList.contains('active')).to.be.true;
  });

  it('should call Router.go("/") when employees button is clicked', async () => {
    const el = await fixture(html`<app-header></app-header>`);

    let calledPath = null;
    const origGo = Router.go;
    Router.go = (path) => {
      calledPath = path;
    };
    const button = el.shadowRoot.querySelectorAll(
      '.app-header_routing-buttons'
    )[0];

    button.click();
    expect(calledPath).to.equal('/');
    Router.go = origGo;
  });

  it('should call Router.go("/add-new-employee") when add-new-employee button is clicked', async () => {
    const el = await fixture(html`<app-header></app-header>`);

    let calledPath = null;
    const origGo = Router.go;
    Router.go = (path) => {
      calledPath = path;
    };
    const btn = el.shadowRoot.querySelectorAll(
      '.app-header_routing-buttons'
    )[1];

    btn.click();
    expect(calledPath).to.equal('/add-new-employee');
    Router.go = origGo;
  });

  it('should update language and flag image on language-changed event', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    const event = new CustomEvent('language-changed', {detail: 'tr'});

    window.dispatchEvent(event);
    await el.requestUpdate();
    
    expect(el.lang).to.equal('tr');
    const img = el.shadowRoot.querySelector('.app-header_lang-button img');
    expect(img.src).to.include('turkish.webp');
  });
});
