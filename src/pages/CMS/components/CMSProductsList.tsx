import { Product } from "@/model/Product";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import imgPlaceholder from '@assets/img-placeholder.png';

export interface CMSProductsListProps {
    products: Product[],
    activeProduct: Partial<Product> | null,
    onProductClick: (product: Partial<Product>) => void,
    onDeleteProduct: (productId: string) => void
}

const CMSProductsList = ({ activeProduct, onDeleteProduct, onProductClick, products }: CMSProductsListProps) => {
    return (
        <table className="table-auto w-full hover">
            <thead>
                <tr>
                    <td className='font-bold text-xl'>Nome</td>
                    <td className='font-bold text-xl text-center'>Immagine</td>
                    <td className='font-bold text-xl text-center'>Costo</td>
                    <td className='font-bold text-xl text-end'>Elimina</td>
                </tr>
            </thead>

            <tbody>
                {products.map(product => (
                    <tr
                        key={product.id}
                        className={clsx(
                            'cursor-pointer h-24',
                            { 'bg-sky-300 text-slate-800 pointer-events-none': product.id === activeProduct?.id }
                        )}
                        onClick={() => onProductClick(product)}
                    >
                        <td className='font-semibold'>{product.name}</td>
                        <td>
                            {
                                product.tmb
                                    ? <img
                                        src={product.tmb} alt={product.name}
                                        className='h-16 mx-auto object-contain rounded-xl'
                                    />
                                    : <img
                                        src={imgPlaceholder}
                                        alt={product.name}
                                        className='h-16 w-28 mx-auto object-contain rounded-xl bg-white'
                                    />
                            }
                        </td>
                        <td className='font-semibold text-center'>€ {product.cost}</td>
                        <td className='text-end'>
                            <FontAwesomeIcon
                                className='pr-6'
                                icon={faTrash}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteProduct(product.id);
                                }}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CMSProductsList