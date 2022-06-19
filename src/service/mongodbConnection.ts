import mongoose from 'mongoose';
import SchemaCartProducts from '../schemas/cartProducts';

async function connectToDatabase() {
  try {
    const connection = await mongoose.createConnection(
      process.env.URL_MONGODB ?? ''
    );

    const cartProducts = connection.model('CartProducts', SchemaCartProducts);
    return cartProducts;
  } catch (error) {
    throw `${error}`;
  }
}

export default connectToDatabase;
