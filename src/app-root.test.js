import {expect, fixture, html} from '@open-wc/testing';
import './app-root.js';

describe('AppRoot', () => {
  it('should render app-header and outlet', async () => {
    const el = await fixture(html`<app-root></app-root>`);

    expect(el.shadowRoot.querySelector('app-header')).to.exist;
    expect(el.shadowRoot.querySelector('#outlet')).to.exist;
  });
});
