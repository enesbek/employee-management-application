import {createStore} from 'zustand/vanilla';
import {fetchEmployees, clearEmployeeCache} from '../api/employeesApi.js';

export const useEmployeesStore = createStore((set, get) => ({
  employees: [],
  currentPage: 1,
  pageSize: 9,
  total: 0,
  loading: false,
  error: null,
  searchQuery: '',
  selectedEmployee: null,

  getEmployees: async () => {
    const {currentPage, pageSize, searchQuery} = get();

    set({loading: true, error: null});

    try {
      const data = await fetchEmployees({
        page: currentPage,
        pageSize,
        searchQuery,
      });

      set({
        employees: data.users,
        total: data.total,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
        employees: [],
      });
    }
  },

  setPage: async (page) => {
    set({currentPage: page});
    await get().getEmployees();
  },

  setPageSize: async (pageSize) => {
    set({pageSize, currentPage: 1});
    await get().getEmployees();
  },

  setSearchQuery: async (searchQuery) => {
    set({searchQuery, currentPage: 1});
    clearEmployeeCache(); 
    await get().getEmployees();
  },

  selectEmployee: (employee) => {
    set({selectedEmployee: employee});
  },

  updateEmployee: async (id, updates) => {
    set({loading: true, error: null});

    try {
      const {employees} = get();
      const updatedEmployees = employees.map((emp) =>
        emp.id === id ? {...emp, ...updates} : emp
      );

      set({
        employees: updatedEmployees,
        selectedEmployee: null,
        loading: false,
      });

      clearEmployeeCache(); 
    } catch (error) {
      set({error: error.message, loading: false});
      throw error;
    }
  },

  deleteEmployee: async (id) => {
    set({loading: true, error: null});

    try {
      const {employees, total} = get();
      const updatedEmployees = employees.filter((emp) => emp.id !== id);

      set({
        employees: updatedEmployees,
        total: total - 1,
        loading: false,
      });

      clearEmployeeCache(); 

      const {currentPage} = get();
      if (updatedEmployees.length === 0 && currentPage > 1) {
        await get().setPage(currentPage - 1);
      }
    } catch (error) {
      set({error: error.message, loading: false});
      throw error;
    }
  },

  addEmployee: async (employeeData) => {
    set({loading: true, error: null});

    try {
      const newEmployee = {
        ...employeeData,
        id: Date.now(),
      };

      const {employees, total} = get();
      const updatedEmployees = [newEmployee, ...employees];

      set({
        employees: updatedEmployees,
        total: total + 1,
        loading: false,
      });

      clearEmployeeCache(); 
    } catch (error) {
      set({error: error.message, loading: false});
      throw error;
    }
  },

  reset: () => {
    set({
      employees: [],
      currentPage: 1,
      pageSize: 9,
      total: 0,
      loading: false,
      error: null,
      searchQuery: '',
      selectedEmployee: null,
    });
    clearEmployeeCache();
  },
}));

export const selectTotalPages = (state) =>
  Math.ceil(state.total / state.pageSize);

export const selectHasNextPage = (state) =>
  state.currentPage < selectTotalPages(state);

export const selectHasPreviousPage = (state) => state.currentPage > 1;

export const selectIsFirstPage = (state) => state.currentPage === 1;

export const selectIsLastPage = (state) =>
  state.currentPage === selectTotalPages(state);
