// simple in-memory cache mechanism
const employeeCache = new Map();

/**
 * Fetch employees from DummyJSON API with pagination
 * @param {number} page - Current page (1-based)
 * @param {number} pageSize - Number of employees per page
 * @param {string} [searchQuery] - Optional search query
 * @returns {Promise<{users: Array, total: number}>}
 */
export async function fetchEmployees({
  page = 1,
  pageSize = 9,
  searchQuery = '',
} = {}) {
  const skip = (page - 1) * pageSize;
  const cacheKey = `${page}_${pageSize}_${searchQuery}`;

  if (employeeCache.has(cacheKey)) {
    console.log('Returning data from cache for', cacheKey);
    return employeeCache.get(cacheKey);
  }

  let url = `https://dummyjson.com/users?limit=${pageSize}&skip=${skip}`;
  if (searchQuery) {
    url = `https://dummyjson.com/users/search?q=${encodeURIComponent(
      searchQuery
    )}&limit=${pageSize}&skip=${skip}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');

    const data = await res.json();

    // Api doesn't provide employmentDate, so I calculated employment date based on birth date
    const updatedUsers = (data.users || []).map((employee) => {
      const birth = new Date(employee.birthDate);
      const employmentDate = new Date(birth);
      employmentDate.setFullYear(employmentDate.getFullYear() + 18);
      const employmentDateStr = employmentDate.toISOString().split('T')[0];
      return {
        ...employee,
        dateOfEmployment: employmentDateStr,
      };
    });

    const updatedData = {...data, users: updatedUsers};

    employeeCache.set(cacheKey, updatedData);

    return updatedData; // { users: [...], total, skip, limit }
  } catch (err) {
    console.error('Failed to fetch employees:', err);
    throw err;
  }
}

export function clearEmployeeCache() {
  employeeCache.clear();
}
