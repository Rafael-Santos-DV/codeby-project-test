import { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';

// import components
import {
  BoxAmount,
  BoxButton,
  ContainerFooter,
  ContainerProducts,
  InformationShipping,
  MainProduct,
} from '../styles/Pages/Products/styles';

import { ProductOfCar } from '../components/ProductOfCar/ProductOfCar';
import { Button } from '../components/Button/Button';
import formatPricePtBr from '../utils/formatPricePtBr';

import { ContextAppProvider } from './_app';
import { ToastContainer } from 'react-toastify';

const Products: React.FC<NextPage> = () => {
  const {
    getTotal,
    productsCart,
    handleChangeRemoveProduct,
    handleChangeAddProduct,
  } = useContext(ContextAppProvider);

  const [data, setData] = useState<typeof productsCart>();

  useEffect(() => {
    if (productsCart) {
      setData(productsCart);
    }
  }, [productsCart]);

  return (
    <div>
      <Head>
        <meta name="description" content="" />
        <title>Meus Produtos</title>
      </Head>

      <MainProduct>
        <h1>Meus Produtos</h1>

        <ContainerProducts>
          {data &&
            data.map((product, index) => (
              <ProductOfCar
                amount={product.amount}
                key={product.productId}
                imageUrl={String(product.imageUrl)}
                newPrice={Number(product.newPrice)}
                oldPrice={Number(product.oldPrice)}
                productName={String(product.productName)}
                onClickButtonMinus={() =>
                  handleChangeRemoveProduct(product.productId)
                }
                onClickButtonPlus={() =>
                  handleChangeAddProduct(product.productId, index)
                }
              />
            ))}
        </ContainerProducts>

        <ContainerFooter>
          <BoxAmount>
            <span>Total</span>
            <div>
              <span>{formatPricePtBr(getTotal, true)}</span>
            </div>
          </BoxAmount>
          {getTotal > 10 && (
            <InformationShipping>
              Parabéns, sua compra tem frete grátis
            </InformationShipping>
          )}
          <BoxButton>
            <Button>Finalizar Compra</Button>
          </BoxButton>
        </ContainerFooter>
      </MainProduct>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default Products;
