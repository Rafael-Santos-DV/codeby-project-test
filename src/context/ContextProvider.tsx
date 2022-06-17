import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import ResponseProducts from '../types/DataTypeProduct';

type ContextProviderType = {
  children: ReactNode;
};

type GlobalDataType = {
  data: ResponseProducts[];
  amountProducts: number;
};

export const GlobalDataProvider = createContext({} as GlobalDataType);

const ContextProvider: React.FC<ContextProviderType> = ({ children }) => {
  const [data, setData] = useState<ResponseProducts[]>([]);
  const [amountProducts, setAmountProducts] = useState(0);
  const Router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await Axios.get('/api/products');
      setData(response.data);
    })();
  }, [Router.pathname]);

  return (
    <GlobalDataProvider.Provider value={{ data, amountProducts }}>
      {children}
    </GlobalDataProvider.Provider>
  );
};

export default ContextProvider;
