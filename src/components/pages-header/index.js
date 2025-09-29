import {html} from 'lit';
import {pagesHeaderStyles} from './styles.js';
import {BaseElement} from '../base-element/index.js';

export default class PagesHeader extends BaseElement {
  static properties = {
    view: {type: String},
    title: {type: String},
    showActions: {type: Boolean},
  };

  static styles = pagesHeaderStyles;

  constructor() {
    super();
    this.view = 'list';
    this.title = 'employeeList';
    this.showActions = true;
    console.log(this.showActions);
  }

  _setView(view) {
    this.view = view;
    this.dispatchEvent(
      new CustomEvent('view-change', {
        detail: {view},
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      />
      <div class="pages-header">
        <div class="pages-header_title">${this.t(this.title)}</div>
        ${this.showActions
          ? html`
              <div class="pages-header_actions">
                <button
                  class="view-button ${this.view === 'list' ? 'active' : ''}"
                  @click=${() => this._setView('list')}
                >
                  <i class="fa-solid fa-bars"></i>
                </button>
                <button
                  class="view-button ${this.view === 'card' ? 'active' : ''}"
                  @click=${() => this._setView('card')}
                >
                  <i class="fa-solid fa-table-cells"></i>
                </button>
              </div>
            `
          : null}
      </div>
    `;
  }
}

customElements.define('pages-header', PagesHeader);
