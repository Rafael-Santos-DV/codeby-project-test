import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

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

const Products: React.FC<NextPage> = () => {
  return (
    <div>
      <Head>
        <meta name="description" content="" />
        <title>Meus Produtos</title>
      </Head>

      <MainProduct>
        <h1>Meus Produtos</h1>

        <ContainerProducts>
          <ProductOfCar
            imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
            newPrice={200}
            oldPrice={300}
            productName="Camisa Jess"
            amount={2}
          />

          <ProductOfCar
            imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
            newPrice={200}
            oldPrice={300}
            productName="Camisa Jess"
            amount={2}
          />

          <ProductOfCar
            imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
            newPrice={200}
            oldPrice={300}
            productName="Camisa Jess"
            amount={2}
          />
        </ContainerProducts>

        <ContainerFooter>
          <BoxAmount>
            <span>Total</span>
            <div>
              <span>{formatPricePtBr(200, true)}</span>
            </div>
          </BoxAmount>
          <InformationShipping>
            Parabéns, sua compra tem frete grátis
          </InformationShipping>

          <BoxButton>
            <Button>Finalizar Compra</Button>
          </BoxButton>
        </ContainerFooter>
      </MainProduct>
    </div>
  );
};

export default Products;
