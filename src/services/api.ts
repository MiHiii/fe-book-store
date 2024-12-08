import axios from '../utils/axios-customize';

export const callRegister = (
  fullName: string,
  email: string,
  password: string,
  phone: string,
) => {
  return axios.post('/api/v1/user/register', {
    fullName,
    email,
    password,
    phone,
  });
};

export const callLogin = (username: string, password: string) => {
  return axios.post('/api/v1/auth/login', { username, password });
};

export const callFetchAccount = () => {
  return axios.get('/api/v1/auth/account');
};

export const callLogout = () => {
  return axios.post('/api/v1/auth/logout');
};

export const callFetchListUser = (query: string) => {
  return axios.get(`/api/v1/user?${query}`);
};

export const deleteUser = (id: string) => {
  return axios.delete(`/api/v1/user/${id}`);
};

export const addUser = (
  fullName: string,
  password: string,
  email: string,
  phone: string,
) => {
  return axios.post('/api/v1/user', {
    fullName,
    password,
    email,
    phone,
  });
};

export const addListUser = (data: any) => {
  return axios.post('/api/v1/user/bulk-create', data);
};
