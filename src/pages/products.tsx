import { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext } from 'react';

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
import { GlobalDataProvider } from '../context/ContextProvider';
import { ApiCode } from '../service/api';
import { setCookies } from 'cookies-next';
import { ContextAppProvider } from './_app';

const Products: React.FC<NextPage> = () => {
  const { getTotal, productsCart, codeByCookie, setRefresh } =
    useContext(GlobalDataProvider);

  const { setRefreshGlobal } = useContext(ContextAppProvider);

  const handleChangeRemoveProduct = (productId: string, index: number) => {};

  const handleChangeAddProduct = async (productId: string, index: number) => {
    await ApiCode.post('/addProductCart', {
      productId,
      indexCart: index,
      cartId: codeByCookie,
    });

    setRefresh((prev) => !prev);
    setRefreshGlobal((prev) => !prev);
    setCookies('codeby-products-cart', codeByCookie, {
      maxAge: 60 * 60 * 24,
    });
  };

  return (
    <div>
      <Head>
        <meta name="description" content="" />
        <title>Meus Produtos</title>
      </Head>

      <MainProduct>
        <h1>Meus Produtos</h1>

        <ContainerProducts>
          {productsCart &&
            productsCart.map((product, index) => (
              <ProductOfCar
                amount={product.amount}
                key={product.productId}
                imageUrl={String(product.imageUrl)}
                newPrice={Number(product.newPrice)}
                oldPrice={Number(product.oldPrice)}
                productName={String(product.productName)}
                onClickButtonMinus={() =>
                  handleChangeRemoveProduct(product.productId, index)
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
    </div>
  );
};

export default Products;
