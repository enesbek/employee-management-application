import {html} from 'lit';
import {BaseElement} from '../base-element/index.js';
import {deleteModalStyles} from './styles.js';

export default class DeleteModal extends BaseElement {
  static properties = {
    isOpen: {type: Boolean},
    employee: {type: Object},
    batch: {type: Boolean},
    selectedEmployees: {type: Array},
  };

  static styles = deleteModalStyles;

  constructor() {
    super();
    this.isOpen = false;
    this.employee = null;
    this.batch = false;
    this.selectedEmployees = [];
  }

  handleDelete() {
    this.dispatchEvent(
      new CustomEvent('confirm-delete', {
        detail: this.batch ? this.selectedEmployees : this.employee,
        bubbles: true,
        composed: true,
      })
    );
  }

  handleCancel() {
    this.dispatchEvent(
      new CustomEvent('cancel-delete', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      this.handleCancel();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleKeyDown = (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.handleCancel();
      }
    };
    window.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._handleKeyDown);
  }

  render() {
    if (!this.isOpen) {
      return html``;
    }
    console.log('this.selectedEmployees', this.selectedEmployees);
    let message = '';
    if (this.batch && this.selectedEmployees?.length) {
      message = `${this.t('deleteConfirmationMessageLeft')} ${
        this.selectedEmployees.length
      } ${this.t('employees')} ${this.t('deleteConfirmationMessageRight')}`;
    } else if (this.employee) {
      message = `${this.t('deleteConfirmationMessageLeft')} ${
        this.employee.firstName
      } ${this.employee.lastName} ${this.t('deleteConfirmationMessageRight')}`;
    }

    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      />
      <div class="modal-overlay" @click=${this.handleOverlayClick}>
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">
              <p>${this.t('areYouSure')}</p>
            </div>
            <div class="button-close" @click=${this.handleCancel}>
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div class="modal-body">
            <p>${message}</p>
          </div>

          <div class="modal-footer">
            <button class="button button-delete" @click=${this.handleDelete}>
              ${this.t('proceed')}
            </button>
            <button class="button button-cancel" @click=${this.handleCancel}>
              ${this.t('cancel')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('delete-modal', DeleteModal);
