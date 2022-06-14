import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://vtexstore.codeby.com.br/api/catalog_system/pub/products',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default Api;
