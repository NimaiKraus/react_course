import { Product } from "@/model/Product";

import { ProductsReducerActions } from "./products.actions";

export interface ProductsState {
    pending: boolean,
    products: Product[],
    error: string | null,
    activeProduct: Partial<Product> | null
}

export const productsReducer = (state: ProductsState, action: ProductsReducerActions) => {
    const { type, payload } = action;

    switch (type) {
        case 'productsFetchedSuccessfully':
            return { ...state, pending: false, products: payload, error: null };

        case 'productCreatedSuccessfully':
            return { ...state, products: [...state.products, payload], activeProduct: null, error: null, pending: false };

        case 'productEditedSuccessfully':
            return {
                ...state,
                products: state.products.map(product => product.id === payload.id ? payload : product),
                error: null,
                pending: false,
                activeProduct: null,
            };

        case 'productDeletedSuccessfully':
            return {
                ...state,
                products: state.products.filter(product => product.id !== payload),
                error: null,
                activeProduct: state.activeProduct && state.activeProduct.id === payload
                    ? null
                    : state.activeProduct,
                pending: false
            };

        case 'activeProductSettedSuccessfully':
            return {
                ...state,
                activeProduct: payload
            };

        case 'error':
            return { ...state, error: payload, pending: false };
            
        case 'pending':
            return { ...state, pending: payload, error: null };

        default:
            return state;
    }
}

export const initialState: ProductsState = { pending: false, products: [], activeProduct: null, error: null };