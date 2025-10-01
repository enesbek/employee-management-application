import {html} from 'lit';
import {Router} from '@vaadin/router';
import {t, setLanguage} from '../../i18n/index.js';
import {appHeaderStyles} from './styles.js';
import {BaseElement} from '../base-element/index.js';

export default class AppHeader extends BaseElement {
  static styles = appHeaderStyles;
  constructor() {
    super();
    this.lang = document.documentElement.lang || 'en';
    this._onLangChange = this._onLangChange.bind(this);
    this.activeRoute = window.location.pathname;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', this._onLangChange);
    window.addEventListener('vaadin-router-location-changed', (e) => {
      this.activeRoute = e.detail.location.pathname;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('language-changed', this._onLangChange);
  }

  _onLangChange(e) {
    this.lang = e.detail;
    this.requestUpdate();
  }

  _toggleLanguage() {
    const newLang = this.lang === 'en' ? 'tr' : 'en';
    setLanguage(newLang);
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      />
      <header class="app-header">
        <div class="app-header_left" @click=${() => Router.go('/')}>
          <img src="../../assets/ing.webp" alt="Logo" height="40" />
          <span class="app-header_bank-name">ING</span>
        </div>
        <div class="app-header_right">
          <button
            class="app-header_routing-buttons ${this.activeRoute === '/'
              ? 'active'
              : ''}"
            @click=${() => Router.go('/')}
          >
            <i class="fa-solid fa-users"></i>${this.t('employees')}
          </button>
          <button
            class="app-header_routing-buttons ${this.activeRoute ===
            '/add-new-employee'
              ? 'active'
              : ''}"
            @click=${() => Router.go('/add-new-employee')}
          >
            <i class="fa-solid fa-plus"></i>${t('addNew')}
          </button>
          <button class="app-header_lang-button" @click=${this._toggleLanguage}>
            <img
              src=${this.lang === 'en'
                ? '../../assets/english.webp'
                : '../../assets/turkish.webp'}
              alt="Language"
              height="20"
              width="30"
            />
          </button>
        </div>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
