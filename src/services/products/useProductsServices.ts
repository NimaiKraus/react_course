import { useReducer } from 'react';
import { initialState, productsReducer } from './products.reducer';
import { createNewDbProduct, deleteDbProduct, editDbProduct, getDbProductsList } from './products.api';
import { Product } from '@/model/Product';

export const useProductsServices = () => {
    const [state, dispatch] = useReducer(productsReducer, initialState);

    const getProductsList = async () => {
        dispatch({ type: 'pending', payload: true })

        try {
            const response = await getDbProductsList();
    
            dispatch({ type: 'productsFetchedSuccessfully', payload: response.items })

        } catch (error) {
            dispatch({ type: 'error', payload: 'Something went wrong while trying to fetch products!'})
        }
    }
    
    const createProduct = async (newProduct: Partial<Product>) => {
        dispatch({ type: 'pending', payload: true })
    
        try {
            const response = await createNewDbProduct(newProduct);
    
            dispatch({ type: 'productCreatedSuccessfully', payload: response })
    
        } catch (error) {
            dispatch({ type: 'error', payload: 'Something went wrong while trying to create a new product!'})
        }
    }

    const editProduct = async (newProduct: Partial<Product>) => {
        dispatch({ type: 'pending', payload: true })
    
        try {
            const response = await editDbProduct(newProduct);
    
            dispatch({ type: 'productEditedSuccessfully', payload: response });
    
        } catch (error) {
            dispatch({ type: 'error', payload: 'Something went wrong while trying to edit a product!'});
        }
    }
    
    const deleteProduct = async (productId: string) => {
        dispatch({ type: 'pending', payload: true })
    
        try {
            await deleteDbProduct(productId);
    
            dispatch({ type: 'productDeletedSuccessfully', payload: productId })
    
        } catch (error) {
            dispatch({ type: 'error', payload: 'Something went wrong while trying to delete a product!'})
        }
    }

    const setActiveProduct = async (product: Partial<Product> | {}) => {
        dispatch({ type: 'activeProductSettedSuccessfully', payload: product});
    }
    
    const removeActiveProduct = async () => {
        dispatch({ type: 'activeProductSettedSuccessfully', payload: null});
    }

    return {
        actions: {
            getProductsList,
            createProduct,
            deleteProduct,
            editProduct,
            setActiveProduct,
            removeActiveProduct
        },
        state
    }
}