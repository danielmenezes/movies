import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken && error.response?.status === 401) {
      logout();
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && originalRequest.url !== '/auth/refresh-token') {
      
      try {
        const response = await api.post('/auth/refresh-token', { refreshToken });

        localStorage.setItem('access_token', response.data?.body?.access_token);
        localStorage.setItem('refresh_token', response.data?.body?.refresh_token);

        // Refaz a requisição original com o token renovado
        return api(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login';
}

export default api;
