import type { NextPage } from 'next';
import Head from 'next/head';
import { ContainerProducts, Main } from '../styles/Pages/Home/styles';
import { ToastContainer, toast } from 'react-toastify';

import { getCookie, setCookies } from 'cookies-next';

import { BoxOfProduct } from '../components/BoxOfProduct/BoxOfProduct';
import { useContext } from 'react';
import { GlobalDataProvider } from '../context/ContextProvider';
import 'react-toastify/dist/ReactToastify.css';

type TypeCookies = Record<string, [string, number, number]>; // -> { "id": ["id", amount, index] }

const Home: React.FC<NextPage> = () => {
  const { data } = useContext(GlobalDataProvider);

  const handleClickAddCar = (productId: string, index: number) => {
    let cookieWithIds = getCookie('codeby-products-car');

    if (!cookieWithIds) {
      setCookies(
        'codeby-products-car',
        `{ "${productId}": [${productId}, 1, ${index}]}`,
        {
          maxAge: 60 * 60 * 24,
        }
      );

      toast.success('Adicionado ao carrinho.');
      return;
    }

    let parseProductsCar = JSON.parse(String(cookieWithIds)) as TypeCookies;

    if (!parseProductsCar[productId]) {
      const newParseProductsCar = {
        ...parseProductsCar,
        [productId]: [productId, 1, index],
      };

      setCookies('codeby-products-car', JSON.stringify(newParseProductsCar), {
        maxAge: 60 * 60 * 24,
      });

      toast.success('Adicionado ao carrinho.');

      return;
    }

    const newParseProductsCar = {
      ...parseProductsCar,
      [productId]: [
        productId,
        Number(parseProductsCar[productId][1]) + 1,
        index,
      ],
    };

    setCookies('codeby-products-car', JSON.stringify(newParseProductsCar), {
      maxAge: 60 * 60 * 24,
    });
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
                    onClick={() => handleClickAddCar(itemId, index)}
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
