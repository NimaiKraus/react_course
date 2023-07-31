import { useState, useEffect } from 'react';

import { Product } from '@/model/Product';
import { pocketbase } from '@/pocketbase';


const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);


  const getProducts = async () => {
    const products = await pocketbase.collection('products').getList<Product>();

    setProducts(products.items)
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1 className="title">Shop</h1>

      {products.map((product) => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
    </div>
  )
}

export default Shop