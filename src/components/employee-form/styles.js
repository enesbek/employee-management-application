import {css} from 'lit';

export const employeeFormStyles = css`
  :host {
    display: block;
    background-color: white;
    height: 100%;
    padding: 1rem;
  }

  form {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    width: 100%;
  }

  input,
  select,
  button {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    grid-column: span 3;
    background-color: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }

  @media (max-width: 900px) {
    form {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }

  @media (max-width: 600px) {
    form {
      grid-template-columns: 1fr;
    }

    button {
      grid-column: 1;
    }
  }
`;
