export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
}

export interface BasketItem {
    productId: number;
    name: string;
    brand: string;
    price: number;
    pictureUrl: string;
    type: string;
    quantity: number;
}
