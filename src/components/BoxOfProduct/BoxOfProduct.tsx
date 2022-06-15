import Link from 'next/link';
import React from 'react';
import formatPricePtBr from '../../utils/formatPricePtBr';
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
};

export const BoxOfProduct: React.FC<ProductType> = ({
  imageUrl,
  installments,
  newPrice,
  oldPrice,
  productId,
  productName,
}) => {
  return (
    <Container>
      <Link href={`/products/${productId}`}>
        <a>
          <div className="box-image">
            <img src={imageUrl} alt={productName} />
          </div>
          <BoxInformation>
            <ProductName className="product-name">
              <strong>{productName}</strong>
            </ProductName>
            <OldPrice>
              <abbr>R$</abbr>
              <span>{formatPricePtBr(oldPrice)}</span>
            </OldPrice>
            <NewPrice>
              <abbr>R$</abbr>
              <span>{formatPricePtBr(newPrice)}</span>
            </NewPrice>
            <InfoInstallments>
              ou <strong>{installments}</strong> de{' '}
              <strong>{formatPricePtBr(newPrice / installments, true)}</strong>{' '}
              sem juros
            </InfoInstallments>
          </BoxInformation>
        </a>
      </Link>
    </Container>
  );
};
