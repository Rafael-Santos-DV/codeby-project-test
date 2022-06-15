import React from 'react';
import formatPricePtBr from '../../utils/formatPricePtBr';
import {
  BoxImage,
  Container,
  CurrentPrice,
  IncreaseOrDecrease,
  InformationProduct,
  OldPrice,
} from './style';

type ProductType = {
  imageUrl: string;
  productName: string;
  oldPrice: number;
  newPrice: number;
  amount: number;
};

export const ProductOfCar: React.FC<ProductType> = ({
  imageUrl,
  newPrice,
  oldPrice,
  productName,
  amount,
}) => {
  return (
    <Container>
      <BoxImage>
        <img src={imageUrl} alt={productName} />
      </BoxImage>
      <InformationProduct>
        <strong>{productName}</strong>

        <OldPrice>
          <OldPrice>
            <abbr>R$</abbr>
            <span>{formatPricePtBr(oldPrice)}</span>
          </OldPrice>
        </OldPrice>

        <CurrentPrice>
          <abbr>R$</abbr>
          <span>{formatPricePtBr(newPrice)}</span>
        </CurrentPrice>

        <IncreaseOrDecrease>
          <button type="button">+</button>
          <button type="button">-</button>
          <span>{amount}</span>
        </IncreaseOrDecrease>
      </InformationProduct>
    </Container>
  );
};
