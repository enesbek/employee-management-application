import {css} from 'lit';

export const employeePageStyles = css`
  :host {
    display: block;
    padding: 2rem 2rem;
    max-height: 100%;
    min-width: 750px;
  }

  .employees-page {
    min-width: 750px;
    overflow-x: auto;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    gap: 1.2rem;
  }

  .pagination button {
    border: none;
    background: none;
    cursor: pointer;
    color: var(--text-dark-gray);
    font-size: 0.9rem;
    font-weight: lighter;
  }
  .hover {
    color: var(--inactive-color);
  }

  .pagination .left {
    color: var(--text-gray) !important;
  }

  .pagination button.active {
    background: var(--primary-color);
    border-radius: 50%;
    color: white;
    padding: 0.3rem 0.6rem;
  }
`;
