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
          <img src={imageUrl} alt={productName} />
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

          <InfoInstallments>
            ou <strong>{installments}</strong> de{' '}
            <strong>{formatPricePtBr(newPrice / installments, true)}</strong>{' '}
            sem juros
          </InfoInstallments>
        </BoxInformation>
      </div>
      {/* </a>
      </Link> */}
    </Container>
  );
};
