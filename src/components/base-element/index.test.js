import {expect, fixture, html} from '@open-wc/testing';
import './index.js';

describe('BaseElement', () => {
  it('should set lang from document or default to en', async () => {
    const el = await fixture(html`<base-element></base-element>`);

    expect(['en', document.documentElement.lang]).to.include(el.lang);
  });

  it('should update lang and call requestUpdate on language-changed event', async () => {
    const el = await fixture(html`<base-element></base-element>`);

    let updated = false;
    el.requestUpdate = () => {
      updated = true;
    };
    const event = new CustomEvent('language-changed', {detail: 'tr'});
    window.dispatchEvent(event);

    expect(el.lang).to.equal('tr');
    expect(updated).to.be.true;
  });

  it('should call t function with given key', async () => {
    const el = await fixture(html`<base-element></base-element>`);

    el.t = (key) => `translated:${key}`;

    expect(el.t('hello')).to.equal('translated:hello');
  });
});
