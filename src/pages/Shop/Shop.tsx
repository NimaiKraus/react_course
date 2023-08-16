import { useState, useEffect } from 'react';
import { pocketbase } from '@/pocketbase';

import { useCart } from '@/services/cart/useCart';
import { useCartPanel } from '@/services/cart/useCartPanel';

import { Product } from '@/model/Product';

import ProductCard from './components/ProductCard';
import { Error, Spinner } from '@/components';
import { useProductsServices } from '@/services/products';


const Shop = () => {
  const { actions, state } = useProductsServices();

  const openCartPanel = useCartPanel(state => state.openCartPanel);

  const addItemToCart = useCart(state => state.addItem2Cart);

  const addProductToCart = (product: Product) => {
    addItemToCart(product);
    openCartPanel();
  }

  useEffect(() => {
    actions.getProductsList();
  }, []);

  return (
    <div className='mt-12'>

      <h1 className="title">Shop</h1>

      {state.pending && <Spinner />}
      {state.error && <Error />}

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16'>
        {state.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCartBtnClick={addProductToCart}
          />
        ))}
      </div>

    </div>
  )
}

export default Shop