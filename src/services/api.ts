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

export const callFetchAllUser = () => {
  return axios.get(`/api/v1/user/`);
};

export const callUpdateUser = (data: any) => {
  return axios.put(`/api/v1/user/`, data);
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

export const callFetchListBook = (query: string) => {
  return axios.get(`/api/v1/book?${query}`);
};

export const callDeleteBook = (id: string) => {
  return axios.delete(`/api/v1/book/${id}`);
};

export const callFetchCategory = () => {
  return axios.get('/api/v1/database/category');
};

export const callCreateBook = (
  thumbnail: string,
  slider: string,
  mainText: string,
  author: string,
  price: number,
  sold: number,
  quantity: number,
  category: string,
) => {
  return axios.post('/api/v1/book', {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};

export const callUpdateBook = (
  id: string,
  thumbnail: string,
  slider: string,
  mainText: string,
  author: string,
  price: number,
  sold: number,
  quantity: number,
  category: string,
) => {
  return axios.put(`/api/v1/book/${id}`, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};

export const callUploadBookImg = (fileImg: any) => {
  const bodyFormData = new FormData();
  bodyFormData.append('fileImg', fileImg);
  return axios({
    method: 'post',
    url: '/api/v1/file/upload',
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'upload-type': 'book',
    },
  });
};

export const callFetchBookById = (id: string) => {
  return axios.get(`api/v1/book/${id}`);
};
