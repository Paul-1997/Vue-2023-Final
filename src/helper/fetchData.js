import axios from 'axios';
import Cookies from 'js-cookie';

const authToken = Cookies.get('accessToken') ?? '';
const { VITE_APP_API_URL: base } = import.meta.env;

export default async function FetchData(method = 'get', path = '', data = null) {
  // eslint-disable-next-line dot-notation
  axios.defaults.headers.common['Authorization'] = authToken;
  const result = data
    ? await axios[method](`${base}/${path}`, data)
    : await axios[method](`${base}/${path}`);
  return result;
}
