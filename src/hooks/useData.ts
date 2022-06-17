import { useEffect, useState } from 'react';
import { ApiCode } from '../service/api';
import ResponseProducts from '../types/DataTypeProduct';

export const useData = () => {
  const [data, setData] = useState<ResponseProducts[]>();

  useEffect(() => {
    (async () => {
      const response = (await ApiCode.get('/')).data as ResponseProducts[];
      setData(response);
    })();
  }, []);

  return data;
};
