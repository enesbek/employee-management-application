import {expect, fixture, html} from '@open-wc/testing';
import './index.js';

describe('PagesHeader', () => {
  it('should render with default props', async () => {
    const el = await fixture(html`<pages-header></pages-header>`);

    expect(el.view).to.equal('list');
    expect(el.title).to.equal('employeeList');
    expect(el.showActions).to.be.true;
    expect(el.shadowRoot.querySelector('.pages-header')).to.exist;
  });

  it('should render title using t function', async () => {
    const el = await fixture(
      html`<pages-header .title=${'myTitle'}></pages-header>`
    );

    el.t = (key) => `translated:${key}`;
    await el.requestUpdate();
    const titleDiv = el.shadowRoot.querySelector('.pages-header_title');

    expect(titleDiv.textContent).to.include('translated:myTitle');
  });

  it('should show actions when showActions is true', async () => {
    const el = await fixture(
      html`<pages-header .showActions=${true}></pages-header>`
    );

    expect(el.shadowRoot.querySelector('.pages-header_actions')).to.exist;
  });

  it('should not show actions when showActions is false', async () => {
    const el = await fixture(
      html`<pages-header .showActions=${false}></pages-header>`
    );

    expect(el.shadowRoot.querySelector('.pages-header_actions')).to.not.exist;
  });

  it('should set view to "list" and dispatch event when list button is clicked', async () => {
    const el = await fixture(
      html`<pages-header .view=${'card'}></pages-header>`
    );

    let eventDetail = null;
    el.addEventListener('view-change', (e) => {
      eventDetail = e.detail;
    });

    const listBtn = el.shadowRoot.querySelectorAll('.view-button')[0];
    listBtn.click();

    expect(el.view).to.equal('list');
    expect(eventDetail).to.deep.equal({view: 'list'});
  });

  it('should set view to "card" and dispatch event when card button is clicked', async () => {
    const el = await fixture(
      html`<pages-header .view=${'list'}></pages-header>`
    );

    let eventDetail = null;
    el.addEventListener('view-change', (e) => {
      eventDetail = e.detail;
    });

    const cardBtn = el.shadowRoot.querySelectorAll('.view-button')[1];
    cardBtn.click();

    expect(el.view).to.equal('card');
    expect(eventDetail).to.deep.equal({view: 'card'});
  });

  it('should apply "active" class to correct view button', async () => {
    const el = await fixture(
      html`<pages-header .view=${'card'}></pages-header>`
    );

    const buttons = el.shadowRoot.querySelectorAll('.view-button');

    expect(buttons[0].classList.contains('active')).to.be.false;
    expect(buttons[1].classList.contains('active')).to.be.true;
  });
});
