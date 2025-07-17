import axios from './httpConfig';

export const getAllBooks = () => axios.get('/getAllBooks');
export const getBookById = (id: string) => axios.get(`/${id}`);
export const createBook = (data: any) => axios.post('/', data);
export const updateBookStatus = (id: string, status: string) =>
  axios.patch(`/${id}/status`, { status });
export const deleteBook = (id: string) => axios.delete(`/${id}`);
export const searchBook = (text: string) => axios.get('/search', { params: { text } });
export const getBooksByStatus = (status: string) =>
  axios.get('/readStatus', { params: { status } });
