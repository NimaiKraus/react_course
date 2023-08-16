import { ProductCardProps } from "../types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onAddToCartBtnClick }: ProductCardProps) => {
    return (
        <div
            key={product.id}
            className='bg-white shadow-2xl rounded-xl overflow-hidden text-slate-900 hover:scale-105 hover:shadow-blue-400 transition-all'
        >
            <img src={product.tmb} alt={product.name} className='h-64 w-full object-cover' />

            <div className='flex justify-between items-center p-3 font-bold text-xl'>
                <div>
                    {product.name}
                </div>
                <div>
                    € {product.cost}
                </div>
            </div>

            <p className="p-3">{product.description}</p>

            <div className="flex justify-center">
                <button
                    className="w-fit bg-sky-400 hover:bg-sky-600 text-white font-bold p-3 rounded-full m-2 flex items-center gap-2 transition-all" 
                    onClick={() => onAddToCartBtnClick(product)}
                >
                    <FontAwesomeIcon icon={faCartPlus} />
                    Aggiungi al carrello
                </button>
            </div>
        </div>
    )
}

export default ProductCard