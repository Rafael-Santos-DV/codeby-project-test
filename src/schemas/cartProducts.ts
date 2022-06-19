import mongoose from 'mongoose';

type Products = {
  productId: string;
  indexCart: number;
  amount: number;
  id: string;
};

export type CartProductsType = {
  cartId: string;
  products: Array<Products>;
};

const SchemaCartProducts = new mongoose.Schema<CartProductsType>({
  cartId: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      productId: {
        type: String,
        unique: false,
      },
      indexCart: {
        type: Number,
        required: true,
      },
      amount: { type: Number, required: true },
    },
  ],
});

export default SchemaCartProducts;
