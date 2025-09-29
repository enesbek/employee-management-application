import {css} from 'lit';

export const deleteModalStyles = css`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: fadeIn 0.2s ease-in;
  }

  .modal-overlay.hidden {
    display: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .modal-content {
    background: white;
    border-radius: 2px;
    padding: 1rem;
    max-width: 350px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease-out;
  }

  .modal-header {
    display: flex;
    color: var(--primary-color);
    font-size: 1.2rem;
  }

  .modal-title {
    flex: 1;
    margin: 0;
  }

  .modal-title p {
    margin: 0;
  }

  .modal-body {
    color: var(--text-dark-gray);
    font-size: 0.8rem;
    margin-bottom: 1.2rem;
  }

  .modal-footer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .button {
    padding: 0.5rem 0.8rem;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .button-delete {
    background: var(--primary-color);
    color: white;
    border: none;
  }

  .button-cancel {
    color: var(--border-dark-purple);
    border: 1px solid var(--border-dark-purple);
    background: white;
  }

  .button-close {
    cursor: pointer;
  }
`;
