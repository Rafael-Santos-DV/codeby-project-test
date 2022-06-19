import Axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useData } from '../hooks/useData';
import { CartProductsType } from '../schemas/cartProducts';
import ResponseProducts from '../types/DataTypeProduct';

type ContextProviderType = {
  children: ReactNode;
};

type GlobalDataType = {
  data: ResponseProducts[];
  getTotal: number;
  productsCart: ProductCarType[] | undefined;
  codeByCookie: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

type ProductCarType = {
  productId: string;
  amount: number;
  imageUrl: string;
  newPrice: number;
  oldPrice: number;
  productName: string;
};

export const GlobalDataProvider = createContext({} as GlobalDataType);

const ContextProvider: React.FC<ContextProviderType> = ({ children }) => {
  const [data, setData] = useState<ResponseProducts[]>([]);
  const codebyCookies = getCookie('codeby-products-cart');
  const Router = useRouter();

  const [productsCart, setProductsCart] = useState<ProductCarType[]>();
  const [activeRefresh, setRefresh] = useState(false);

  const [getTotal, setTotal] = useState(0);

  const dataCart = useData({
    path: '/showCart',
    cartId: String(codebyCookies),
    refresh: activeRefresh,
  }) as CartProductsType;

  useEffect(() => {
    if (codebyCookies) {
      let values: ProductCarType[] = [];
      let total = 0;

      data?.forEach((products) => {
        const { items } = products;

        items?.forEach((product) => {
          dataCart.products?.forEach((item) => {
            const { images, sellers, nameComplete } = product;

            if (item.productId === product.itemId) {
              values.push({
                amount: item.amount,
                imageUrl: images[0].imageUrl, // url will always be at index 0
                newPrice: sellers[0].commertialOffer.PriceWithoutDiscount, // priceWD will always be at index 0
                oldPrice: sellers[0].commertialOffer.Price, // old price will always be at index 0
                productName: nameComplete,
                productId: item.productId,
              });

              total +=
                item.amount *
                product.sellers[0].commertialOffer.PriceWithoutDiscount;
            }
          });
        });
      });

      setProductsCart(values);
      setTotal(total);
    }
    console.log(activeRefresh);
  }, [data, codebyCookies, dataCart, activeRefresh]);

  useEffect(() => {
    (async () => {
      const response = await Axios.get('/api/products');
      setData(response.data);
    })();
  }, [Router.pathname]);

  return (
    <GlobalDataProvider.Provider
      value={{
        data,
        getTotal,
        productsCart,
        codeByCookie: String(codebyCookies),
        setRefresh,
      }}
    >
      {children}
    </GlobalDataProvider.Provider>
  );
};

export default ContextProvider;
