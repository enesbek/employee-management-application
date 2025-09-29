import {css} from 'lit';

export const employeeFormStyles = css`
  :host {
    display: block;
    background-color: white;
    min-height: 70vh;
    padding: 0.5rem 1rem;
  }

  .edit-form-desc-text {
    font-size: 0.8rem;
    margin: 0.5rem 0.1rem;
  }

  form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    gap: 2rem;
    padding: 2rem 0;
  }

  .field {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    max-width: 270px;
    width: 100%;
    font-size: 0.8rem;
    color: var(--text-dark-gray);
  }

  label {
    margin-bottom: 0.25rem;
    width: 100%;
    text-align: left;
    color: var(--primary-color);
  }

  input[type='text'],
  input[type='email'],
  input[type='number'],
  input[type='date'],
  input[type='tel'],
  textarea,
  select {
    padding: 10px 6px;
    border-radius: 4px;
    border: 1px solid var(--text-dark-gray);
    font-size: 0.8rem;
    width: 100%;
    max-width: 270px;
    box-sizing: border-box;
  }

  .buttons-row {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .btns {
    min-width: 270px;
    display: flex;
    gap: 2rem;
  }

  .btns button {
    flex: 1;
    padding: 10px 12px;
    border-radius: 8px;
    border: none;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    min-width: 270px;
  }

  .btn-save {
    background: var(--primary-color);
    color: white;
  }
  .btn-cancel {
    background: white;
    color: var(--border-dark-purple);
    border: 1px solid var(--border-dark-purple) !important;
  }

  @media (max-width: 900px) {
    form {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    form {
      grid-template-columns: repeat(1, 1fr);
    }

    .buttons-row {
      display: flex;
      justify-content: center;
    }

    .btns {
      flex-direction: column;
      gap: 1rem;
    }

    .btns button {
      width: 100%;
    }
  }
`;
