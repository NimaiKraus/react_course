import { Product } from "@/model/Product";

export interface ProductCardProps {
    product: Product,
    onAddToCartBtnClick: (product: Product) => void
}