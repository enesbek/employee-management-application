import {LitElement} from 'lit';
import {t} from '../../i18n/index.js';

export class BaseElement extends LitElement {
  static properties = {
    lang: {type: String},
  };

  constructor() {
    super();
    this.lang = document.documentElement.lang || 'en';
    this._onLangChange = this._onLangChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', this._onLangChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('language-changed', this._onLangChange);
  }

  _onLangChange(e) {
    this.lang = e.detail;
    this.requestUpdate();
  }

  t(key) {
    return t(key);
  }
}

customElements.define('base-element', BaseElement);
