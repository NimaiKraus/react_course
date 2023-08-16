import { Product } from "@/model/Product";

export interface FetchProductsAction { type: 'productsFetchedSuccessfully', payload: Product[] };
export interface DeleteProductAction { type: 'productDeletedSuccessfully', payload: string };
export interface EditProductAction { type: 'productEditedSuccessfully', payload: Product };
export interface CreateProductAction { type: 'productCreatedSuccessfully', payload: Product };
export interface SetActiveProductAction { type: 'activeProductSettedSuccessfully', payload: Partial<Product> | null }
export interface PendingAction { type: 'pending', payload: boolean };
export interface ErrorAction { type: 'error', payload: string };

export type ProductsReducerActions = PendingAction | FetchProductsAction | DeleteProductAction | EditProductAction | CreateProductAction | ErrorAction | SetActiveProductAction;