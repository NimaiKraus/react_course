import { create } from "zustand";

import { Product } from '@/model/Product';
import { CartItem } from './../../types/index';

export interface CartState {
    list: CartItem[],
    addItem2Cart: (product2Add: Product) => void,
    removeItemFromCart: (product2RemoveId: string) => void,
    increaseQuantity: (product2RemoveId: string) => void,
    decreaseQuantity: (product2RemoveId: string) => void,
    clearCart: () => void
}

export const useCart = create<CartState>((set, get) => ({
    list: [],
    addItem2Cart: (product) => {
        const alreadyPresentProduct = get().list.find(item => item.product.id === product.id);

        if (alreadyPresentProduct) {
            get().increaseQuantity(product.id);
        } else {
            const product2Add: CartItem = { product, quantity: 1 };

            set(state => ({ list: [...state.list, product2Add] }));
        }
    },
    removeItemFromCart: (productId) => {
        const newProductsList = get().list.filter((product) => product.product.id !== productId);

        set(() => ({ list: newProductsList }));
    },
    increaseQuantity: (productId) => {
        const element2Increase = get().list.find(item => item.product.id === productId);
        
        if (element2Increase) {
            element2Increase.quantity++;
            
            set(state => ({
                list: state.list.map(item => (
                    item.product.id === productId
                        ? element2Increase
                        : item
                ))
            }))
        }
    },
    decreaseQuantity: (productId) => {
        const element2Decrease = get().list.find(item => item.product.id === productId);

        if (element2Decrease && element2Decrease?.quantity === 1) {
            get().removeItemFromCart(productId)
        } 
        
        if (element2Decrease && element2Decrease?.quantity > 0) {
            element2Decrease.quantity--;

            set(state => ({
                list: state.list.map(item => (
                    item.product.id === productId
                        ? element2Decrease
                        : item
                ))
            }))
        }

    },
    clearCart: () => set(() => ({ list: [] })),
}))