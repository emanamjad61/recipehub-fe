const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || 'An error occurred';
    throw new Error(errorMessage);
  }
  return response.json();
};

export const apiGet = async (path, params = {}) => {
  const url = new URL(`${API_BASE_URL}${path}`);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      url.searchParams.append(key, params[key]);
    }
  });

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const apiPost = async (path, body) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

export const apiPut = async (path, body) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

export const apiDelete = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(response);
};
