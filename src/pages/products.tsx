import { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect, useRef, useState } from 'react';

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
import { getCookie, setCookies } from 'cookies-next';
import type { ItemsProducts } from '../types/DataTypeProduct';

type ProductCarType = {
  productId: string;
  productName: string;
  item: ItemsProducts;
  amount: number;
};

const Products: React.FC<NextPage> = () => {
  const { data } = useContext(GlobalDataProvider);
  const [productsCar, setProductsCar] = useState<
    Record<string, ProductCarType>
  >({});

  const [getAmount, setAmount] = useState<Record<string, number>>({});

  const [getTotal, setTotal] = useState(0);

  const [effectRefresh, setRefresh] = useState(false);

  useEffect(() => {
    const productsId = getCookie('codeby-products-car');

    if (productsId) {
      const parseCookie = String(productsId);

      if (!parseCookie) return;

      const ProductsOfCar = JSON.parse(parseCookie);

      data.forEach((value) => {
        const { items, productName } = value;

        items.forEach((item) => {
          const { itemId: productId } = item;

          const dataItem = items[ProductsOfCar?.[productId]?.[2]];
          const amount = ProductsOfCar?.[productId]?.[1];
          const idOfProduct = ProductsOfCar?.[productId]?.[0];

          if (item.itemId.includes(idOfProduct) && amount && idOfProduct) {
            setProductsCar((prev) => ({
              ...prev,
              [productId]: {
                productId,
                productName,
                item: dataItem,
                amount,
              },
            }));
          }
        });
      });

      Object.values(productsCar).forEach((value: ProductCarType) => {
        setTotal(
          (prev) =>
            prev + value.item?.sellers[0].commertialOffer.Price * value.amount
        );

        setAmount((prev) => ({ ...prev, [value.productId]: value.amount }));
      });
    }
  }, [data, effectRefresh]);

  const handleChangeRemoveProduct = (productId: string, index: number) => {
    const productsId = JSON.parse(String(getCookie('codeby-products-car')));

    const element = productsId?.[productId];

    if (element && element[1] >= 1) {
      let newParseProductsCar = {
        ...productsId,
        [productId]: [productId, Number(element[1]) - 1, index],
      };

      Object.values(productsCar).forEach((value: ProductCarType) => {
        setTotal((prev) => prev - value.item?.sellers[0].commertialOffer.Price);
      });

      setAmount((prev) => ({ ...prev, [productId]: prev[productId]-- }));

      setCookies('codeby-products-car', JSON.stringify(newParseProductsCar), {
        maxAge: 60 * 60 * 24,
      });

      return;
    }

    setRefresh((prev) => !prev);
  };

  const handleChangeAddProduct = (productId: string, index: number) => {
    const productsId = JSON.parse(String(getCookie('codeby-products-car')));

    const element = productsId?.[productId];

    if (element) {
      let newParseProductsCar = {
        ...productsId,
        [productId]: [productId, Number(element[1]) + 1, index],
      };

      Object.values(productsCar).forEach((value: ProductCarType) => {
        setTotal((prev) => value.item?.sellers[0].commertialOffer.Price + prev);
      });

      setAmount((prev) => ({ ...prev, [productId]: prev[productId]++ }));

      setCookies('codeby-products-car', JSON.stringify(newParseProductsCar), {
        maxAge: 60 * 60 * 24,
      });

      return;
    }

    setRefresh((prev) => !prev);
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
          {productsCar &&
            Object.values(productsCar).map((value: ProductCarType, index) => (
              <ProductOfCar
                amount={getAmount[value.productId]}
                key={value.productId}
                imageUrl={String(value.item?.images[0].imageUrl)}
                newPrice={Number(value.item?.sellers[0].commertialOffer.Price)}
                oldPrice={Number(value.item?.sellers[0].commertialOffer.Price)}
                productName={String(value.item?.nameComplete)}
                onClickButtonMinus={() =>
                  handleChangeRemoveProduct(value.productId, index)
                }
                onClickButtonPlus={() =>
                  handleChangeAddProduct(value.productId, index)
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
