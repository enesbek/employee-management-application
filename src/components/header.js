import {LitElement, html, css} from 'lit';
import {t, setLanguage} from '../i18n/index.js';

export class AppHeader extends LitElement {
  static styles = css`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem 0.5rem;
    }

    .right {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      padding-right: 1rem;
    }

    .left {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    .bankName {
      font-size: 0.9rem;
      font-weight: semi-bold;
    }

    .routingButtons {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--primary-color);
      font-size: 12px;
      font-weight: 100;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .langButton {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .right i {
      color: var(--primary-color);
      font-size: 18px;
    }
  `;

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
      <header>
        <div class="left">
          <img src="../../assets/ing.webp" alt="Logo" height="40" />
          <span class="bankName">ING</span>
        </div>
        <div class="right">
          <button class="routingButtons">
            <i class="fa-solid fa-users"></i>${t('employees')}
          </button>
          <button class="routingButtons">
            <i class="fa-solid fa-plus"></i>${t('addNew')}
          </button>
          <button class="langButton" @click=${this._toggleLanguage}>
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
