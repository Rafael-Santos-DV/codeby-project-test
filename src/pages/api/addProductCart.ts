import { Model } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { CartProductsType } from '../../schemas/cartProducts';
import ConnectionToDabase from '../../service/mongodbConnection';
import Cors from '../../middleware/Cors';
import { v4 as uuid } from 'uuid';

type CacheDbType = Model<CartProductsType> | null;

let cacheDbCartProducts: CacheDbType = null;

export default async function addProductCart(
  Request: NextApiRequest,
  Response: NextApiResponse
) {
  await Cors(Request, Response);

  // avoiding multiples connnections
  if (!cacheDbCartProducts) {
    cacheDbCartProducts = await ConnectionToDabase();
  }

  const { productId, indexCart, cartId } = Request.body;

  // create new cart
  if (!cartId) {
    const response = await cacheDbCartProducts.create({
      cartId: uuid(),
      products: [
        {
          amount: 1,
          indexCart,
          productId,
          id: uuid(),
        },
      ],
    });

    return Response.status(200).json(response);
  }

  const data = await cacheDbCartProducts.findOne({
    cartId,
  });

  if (!data) {
    const response = await cacheDbCartProducts.create({
      cartId: uuid(),
      products: [
        {
          amount: 1,
          indexCart,
          productId,
          id: uuid(),
        },
      ],
    });

    return Response.status(200).json(response);
  }

  if (data) {
    const { products } = data;

    const [filterProduct] = products.filter(
      (value) => value.productId === productId
    );

    const withoutFilterProduct = products.filter(
      (value) => value.productId !== productId
    );

    // update amount of product
    if (filterProduct) {
      const { amount } = filterProduct;

      filterProduct.amount = amount + 1;

      const dataUpdated = withoutFilterProduct.concat([filterProduct]);

      await cacheDbCartProducts.updateOne(
        { cartId },
        {
          products: dataUpdated,
        }
      );

      return Response.status(200).json(data);
    }

    // add new products to cart
    products.push({
      amount: 1,
      id: uuid(),
      indexCart,
      productId,
    });

    await cacheDbCartProducts.updateOne(
      { cartId },
      {
        products,
      }
    );

    return Response.status(200).json(data);
  }
}
