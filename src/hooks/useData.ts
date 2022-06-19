import { useEffect, useState } from 'react';
import { CartProductsType } from '../schemas/cartProducts';
import { ApiCode } from '../service/api';
import ResponseProducts from '../types/DataTypeProduct';

type DataType<T> = T extends '/products'
  ? ResponseProducts[]
  : CartProductsType;

type UseDataType = {
  path: '/products' | '/showCart';
  cartId?: string;
  refresh?: boolean | string;
};

export const useData = ({ path, cartId, refresh }: UseDataType) => {
  const [data, setData] = useState<DataType<typeof path>>();

  useEffect(() => {
    (async () => {
      if (path === '/showCart') {
        const response = (await ApiCode.post(`${path}`, { cartId }))
          .data as CartProductsType;
        setData(response);
        return;
      }

      const response = (await ApiCode.get(`${path}`))
        .data as ResponseProducts[];
      setData(response);
    })();
  }, [refresh]);

  return data;
};
