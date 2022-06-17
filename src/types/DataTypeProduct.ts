export type ItemsProducts = {
  images: Array<{
    imageUrl: string;
    imageId: string;
  }>;
  nameComplete: string;
  itemId: string;
  sellers: Array<{
    Price: number;
    PriceWithoutDiscount: number;
    sellerId: number;
    commertialOffer: {
      Price: number;
      PriceWithoutDiscount: number;
    };
  }>;
};

type ResponseProducts = {
  productId: string;
  productName: string;
  items: Array<ItemsProducts>;
};

export default ResponseProducts;
