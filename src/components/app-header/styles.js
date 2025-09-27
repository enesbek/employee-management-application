import {css} from 'lit';

export const appHeaderStyles = css`
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 0.5rem;
    background-color: white;
  }

  .app-header_right {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding-right: 1rem;
  }

  .app-header_left {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .app-header_bank-name {
    font-size: 0.9rem;
    font-weight: semi-bold;
  }

  .app-header_routing-buttons {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--inactive-color);
    font-size: 12px;
    font-weight: 100;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .app-header_routing-buttons.active {
    color: var(--primary-color);
  }

  .app-header_lang-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .app-header_right i {
    font-size: 16px;
  }
`;
