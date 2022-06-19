import mongoose from 'mongoose';
import SchemaCartProducts from '../schemas/cartProducts';

async function connectToDatabase() {
  try {
    const connection = await mongoose.createConnection(
      process.env.URL_MONGODB ?? '',
      {
        dbName: 'cartOfProducts',
      }
    );

    const cartProducts = connection.model('cartOfProducts', SchemaCartProducts);
    return cartProducts;
  } catch (error) {
    throw `${error}`;
  }
}

export default connectToDatabase;
