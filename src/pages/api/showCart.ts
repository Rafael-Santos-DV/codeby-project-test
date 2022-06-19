import { Model } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from '../../middleware/Cors';
import { CartProductsType } from '../../schemas/cartProducts';
import ConnectionToDabase from '../../service/mongodbConnection';

type CacheDbType = Model<CartProductsType> | null;

let cacheDbCartProducts: CacheDbType = null;

export default async function showCart(
  Request: NextApiRequest,
  Response: NextApiResponse
) {
  await Cors(Request, Response);

  if (!cacheDbCartProducts) {
    cacheDbCartProducts = await ConnectionToDabase();
  }

  const { cartId } = Request.body;

  try {
    const data = await cacheDbCartProducts.findOne({ cartId });

    if (!data) {
      return Response.status(200).json({ message: 'Cart is empty' });
    }

    return Response.status(200).json(data);
  } catch (err) {
    return Response.status(500).json({ error: 'Internal server error!' });
  }
}
