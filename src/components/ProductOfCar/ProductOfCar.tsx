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
  onClickButtonMinus: () => void;
  onClickButtonPlus: () => void;
};

export const ProductOfCar: React.FC<ProductType> = ({
  imageUrl,
  newPrice,
  oldPrice,
  productName,
  amount,
  onClickButtonMinus,
  onClickButtonPlus,
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
          <button type="button" onClick={onClickButtonPlus}>
            +
          </button>
          <button type="button" onClick={onClickButtonMinus}>
            -
          </button>
          <span>{amount}</span>
        </IncreaseOrDecrease>
      </InformationProduct>
    </Container>
  );
};
