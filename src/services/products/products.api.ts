import { Product } from "@/model/Product";
import { pocketbase } from "@/pocketbase"

export const getDbProductsList = () => {
    return pocketbase.collection('products').getList<Product>();
}

export const deleteDbProduct = (productId: string) => {
    return pocketbase.collection('products').delete(productId);
}

export const createNewDbProduct = (newProduct: Partial<Product>) => {
    return pocketbase.collection('products').create<Product>(newProduct);
}

export const editDbProduct = (newProduct: Partial<Product>) => {
    return pocketbase.collection('products').update<Product>(newProduct.id as string, newProduct );
}