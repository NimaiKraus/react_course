import { Product } from "@/model/Product";

export interface CartItem {
    product: Product,
    quantity: number
}