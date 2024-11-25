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

export const callGetAllUsers = () => {
  return axios.get('/api/v1/user');
};

export const deleteUser = (id: string) => {
  return axios.delete(`/api/v1/user/${id}`);
};
