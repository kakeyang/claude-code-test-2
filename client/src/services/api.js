import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const listsAPI = {
  getAll: () => api.get('/lists'),
  create: (data) => api.post('/lists', data),
  update: (id, data) => api.put(`/lists/${id}`, data),
  delete: (id) => api.delete(`/lists/${id}`),
};

export const cardsAPI = {
  create: (data) => api.post('/cards', data),
  update: (id, data) => api.put(`/cards/${id}`, data),
  move: (id, data) => api.put(`/cards/${id}/move`, data),
  delete: (id) => api.delete(`/cards/${id}`),
};

export default api;