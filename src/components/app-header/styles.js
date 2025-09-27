import {css} from 'lit';

export const appHeaderStyles = css`
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
    color: var(--inactive-color);
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
    font-size: 16px;
  }

  .routingButtons.active {
    color: var(--primary-color);
  }
`;
