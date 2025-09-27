import {css} from 'lit';

export const employeesHeaderStyles = css`
  .employees-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .employees-header__title {
    color: var(--primary-color);
    font-size: 1.2rem;
  }

  .employees-header__actions {
    display: flex;
  }

  .view-button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: lighter;
    -webkit-text-stroke: .5px white;
    color: var(--inactive-color);
  }

  .view-button.active {
    color: var(--primary-color);
  }
`;
