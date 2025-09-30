import {css} from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    background-color: white;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.8rem 0.1rem;
    text-align: center;
  }

  th {
    color: var(--primary-color);
    font-size: 0.8rem;
    font-weight: 300;
  }

  td {
    font-size: 0.8rem;
    font-weight: 300;
  }

  .thin {
    font-weight: 100;
    color: var(--text-gray);
  }

  th,
  tr {
    border-bottom: 2px solid var(--page-background-color);
  }

  tbody tr:last-child {
    border-bottom: none;
  }

  .select-icon {
    color: var(--text-gray);
    cursor: pointer;
    font-size: 1.2rem;
  }

  .select-icon input {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  input[type='checkbox'] {
    accent-color: var(--primary-color);
    color: white;
  }

  .custom-checkbox {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    border: 1px solid var(--text-dark-gray);
    border-radius: 4px;
    cursor: pointer;
    position: relative;
  }

  .custom-checkbox:checked {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }

  .custom-checkbox:checked::after {
    content: '✔';
    color: white;
    font-size: 14px;
    position: absolute;
    left: 2px;
    top: -2px;
  }

  .actions i {
    cursor: pointer;
    margin: 0 0.3rem;
    color: var(--primary-color);
  }

  .button-search {
    background-color: var(--primary-color);
    border: none;
    color: white;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-left: 0.3rem;
  }
`;
