import { CartState } from "./useCart";

export const getCartItemList = (state: CartState) => state.list;

export const getTotalCartPrice = (state: CartState) => state.list.reduce((acc, item) => acc + (item.quantity * item.product.cost), 0);

export const getTotalCartItems = (state: CartState) => state.list.reduce((acc, item) => acc + item.quantity, 0);

export const isCartEmpty = (state: CartState) => state.list.length === 0;