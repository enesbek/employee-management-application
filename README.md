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

![Coverage](https://img.shields.io/badge/coverage-87%25-brightgreen)

### Notes

- Employee data is fetched from dummyjson API.
- Edit / Update requests were implemented, but since the API does not support actual data changes, modifications are not persisted.
- The project was originally cloned from the [lit-element-starter-js](https://github.com/lit/lit-element-starter-js) repository. Since commit history contained starter commits, after the first 4 commits the main and dev branches were rebased and history was reset. If you want to check the initial 4 commits, refer to the archive branch.
