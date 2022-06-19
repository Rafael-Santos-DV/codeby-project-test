import React from 'react';
import formatPricePtBr from '../../utils/formatPricePtBr';
import { Button } from '../Button/Button';
import {
  BoxInformation,
  Container,
  InfoInstallments,
  NewPrice,
  OldPrice,
  ProductName,
} from './style';

type ProductType = {
  imageUrl: string;
  productId: string;
  productName: string;
  oldPrice: number;
  newPrice: number;
  installments: number;
  title?: string;
  onClick?: () => void;
};

export const BoxOfProduct: React.FC<ProductType> = ({
  imageUrl,
  installments,
  newPrice,
  oldPrice,
  productId,
  productName,
  title,
  onClick,
}) => {
  return (
    <Container title={title} onClick={onClick}>
      {/* <Link href={`/products/${productId}`}>
        <a> */}
      <div>
        <div className="box-image">
          <img src={imageUrl} alt={productName} loading="lazy" />
        </div>
        <BoxInformation>
          <ProductName className="product-name">
            <strong>{productName}</strong>
          </ProductName>
          {newPrice === installments && (
            <OldPrice>
              <abbr>R$</abbr>
              <span>{formatPricePtBr(oldPrice)}</span>
            </OldPrice>
          )}
          <NewPrice>
            <abbr>R$</abbr>
            <span>{formatPricePtBr(newPrice)}</span>
          </NewPrice>

          {installments > 1 && (
            <InfoInstallments>
              ou <strong>{installments}</strong> de{' '}
              <strong>{formatPricePtBr(newPrice / installments, true)}</strong>{' '}
              sem juros
            </InfoInstallments>
          )}
          <Button type="button" className="add-car">
            Adicionar ao carrinho
          </Button>
        </BoxInformation>
      </div>
      {/* </a>
      </Link> */}
    </Container>
  );
};
