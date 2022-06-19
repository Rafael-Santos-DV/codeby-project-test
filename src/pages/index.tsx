import type { NextPage } from 'next';
import Head from 'next/head';
import { ContainerProducts, Main } from '../styles/Pages/Home/styles';
import { ToastContainer, toast } from 'react-toastify';

import { getCookie, setCookies } from 'cookies-next';

import { BoxOfProduct } from '../components/BoxOfProduct/BoxOfProduct';
import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalDataProvider } from '../context/ContextProvider';
import 'react-toastify/dist/ReactToastify.css';
import { SkeletonScreen } from '../components/SkeletonScreen/SkeletonScreen';
import { ApiCode } from '../service/api';
import { CartProductsType } from '../schemas/cartProducts';
import { ContextAppProvider } from './_app';

const Home: React.FC<NextPage> = () => {
  const codebyCookieCart = getCookie('codeby-products-cart');
  const { data } = useContext(GlobalDataProvider);
  const [codebyCookie, setCodebyCookie] = useState('');
  const { setRefreshGlobal } = useContext(ContextAppProvider);

  useEffect(() => {
    if (codebyCookieCart) {
      setCodebyCookie(String(codebyCookieCart));
    }
  }, [codebyCookieCart]);

  const handleClickAddCar = async (
    productId: string,
    index: number,
    cartId?: string
  ) => {
    toast.loading('adicionando...', {
      position: 'top-center',
    });

    try {
      const data = (
        await ApiCode.post('/addProductCart', {
          productId,
          indexCart: index,
          cartId,
        })
      ).data as CartProductsType;

      if (!codebyCookie) {
        setCookies('codeby-products-cart', data.cartId, {
          maxAge: 60 * 60 * 24,
        });
      }

      toast.dismiss();
      toast.success('Adicionado ao carrinho!');

      setRefreshGlobal((prev) => !prev);
    } catch (err) {
      toast.error('Erro interno!');
    }
  };
  return (
    <div>
      <Head>
        <title>Teste Codeby</title>
        <meta name="description" content="Testing codeby in NextJs" />
      </Head>
      <Main>
        <h1>Nossos Produtos</h1>
        <ContainerProducts>
          {/* skeleton screen */}

          {!data.length && <SkeletonScreen count={8} childrenLines={1} />}

          {data &&
            data.map((product) =>
              product.items.map(
                (
                  {
                    images: [{ imageUrl, imageId }],
                    nameComplete,
                    sellers,
                    itemId,
                  },
                  index
                ) => (
                  <BoxOfProduct
                    onClick={() =>
                      handleClickAddCar(itemId, index, codebyCookie)
                    }
                    title="Adicionar ao Carrinho"
                    key={nameComplete}
                    imageUrl={imageUrl}
                    newPrice={sellers[0].commertialOffer.Price}
                    oldPrice={Number(sellers[0].PriceWithoutDiscount)}
                    productName={nameComplete}
                    installments={1}
                    productId={imageId}
                  />
                )
              )
            )}
        </ContainerProducts>
        <ToastContainer autoClose={500} />
      </Main>
    </div>
  );
};

export default Home;
