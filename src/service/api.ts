import axios from 'axios';

export const ApiVtex = axios.create({
  baseURL: 'https://vtexstore.codeby.com.br/api/catalog_system/pub/products',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const ApiCode = axios.create({
  baseURL: '/api/products',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
