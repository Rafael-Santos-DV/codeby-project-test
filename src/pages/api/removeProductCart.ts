import { Model } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from '../../middleware/Cors';
import { CartProductsType } from '../../schemas/cartProducts';
import ConnectionToDabase from '../../service/mongodbConnection';

type CacheDbType = Model<CartProductsType> | null;

let cacheDbCartProducts: CacheDbType = null;

export default async function removeProductCart(
  Request: NextApiRequest,
  Response: NextApiResponse
) {
  await Cors(Request, Response);

  if (!cacheDbCartProducts) {
    cacheDbCartProducts = await ConnectionToDabase();
  }

  const { productId, cartId } = Request.body;

  const data = await cacheDbCartProducts.findOne({ cartId });

  if (data) {
    const { products } = data;

    const [filterProduct] = products.filter(
      (value) => value.productId === productId
    );

    if (!filterProduct) {
      return Response.status(200).json({ message: 'Product not found' });
    }

    const withoutFilterProduct = products.filter(
      (value) => value.productId !== productId
    );

    // update amount of product
    if (filterProduct) {
      filterProduct.amount -= 1;

      if (filterProduct.amount <= 0) {
        await cacheDbCartProducts.updateOne(
          { cartId },
          {
            products: withoutFilterProduct,
          }
        );

        return Response.status(200).json({ message: 'Removed with sucess!' });
      }

      const dataUpdated = withoutFilterProduct.concat([filterProduct]);

      await cacheDbCartProducts.updateOne(
        { cartId },
        {
          products: dataUpdated,
        }
      );

      return Response.status(200).json({ message: 'Removed with sucess!' });
    }
  }
}
