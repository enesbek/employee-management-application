# Employee Management Application

It is a simple employee management system implemented with Vanilla JS.

## Features

- List employees
- Add / Edit / Delete employees
- Search by column
- Batch delete
- Unit tests with %87 coverage

## Tech Stack

- **Vanilla JavaScript** (Lit + Web Components)
- **Zustand** for state manager
- **@open-wc/testing** for unit testing
- **CSS** for styling
- **i18n** support (`en`, `tr`)

## Project Structure

```bash
src/
 ├─ api/               # API services
 ├─ components/        # Reusable web components
 │   ├─ app-header/
 │   ├─ base-element/
 │   ├─ delete-modal/
 │   ├─ employee-form/
 │   └─ pages-header/
 ├─ i18n/              # Language files
 ├─ pages/             # Pages (add, edit, list)
 ├─ store/             # Global store (employeesStore)
 └─ styles/            # Global styles
```

![Coverage](https://img.shields.io/badge/coverage-87%25-green)

##Notes

1- Employee data is fetched from dummyjson API.
2- Edit / Update requests were implemented, but since the API does not support actual data changes, modifications are not persisted.
