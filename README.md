# Employee Management Application

employee-management-app/
├── index.html  
├── package.json
├── src/
│ ├── app-root.js # root component, router outlet burada
│ ├── router.js # vaadin-router config
│ ├── state/
│ │ ├── store.js # merkezi state yönetimi
│ │ └── slices/
│ │ └── employees.js # employee CRUD reducer veya custom store
│ ├── i18n/
│ │ ├── en.js # en locale dictionary
│ │ ├── tr.js # tr locale dictionary
│ │ └── index.js # localization helper (dil seçimi, getText)
│ ├── components/ # shared ui components
│ │ ├── nav-menu.js # navigation menu
│ │ ├── employee-card.js# tek employee için card component
│ │ └── form/
│ │ └── employee-form.js # add/edit için form component
│ ├── pages/ # route bazlı view’lar
│ │ ├── employee-list.js # tüm kayıtları listeleme
│ │ ├── employee-add.js # yeni ekleme sayfası
│ │ ├── employee-edit.js # düzenleme sayfası
│ │ └── employee-delete.js # silme confirm sayfası (istersen modal da olur)
│ ├── styles/
│ │ ├── global.css # root global css
│ │ └── responsive.css # media query bazlı responsive stiller
│ └── utils/
│ ├── validators.js # form validation helper
│ └── storage.js # localStorage wrapper
├── test/
│ ├── components/
│ │ └── nav-menu.test.js
│ ├── pages/
│ │ └── employee-list.test.js
│ └── state/
│ └── employees.test.js
