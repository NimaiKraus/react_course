import { useEffect } from 'react';

import { useProductsServices } from "@/services/products";

import { Error, Spinner } from "@/components";
import CMSProductsList from './CMSProductsList';
import CMSProductsSidebar from './CMSProductsSidebar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CMSProducts = () => {
  const { actions, state } = useProductsServices();

  useEffect(() => {
    actions.getProductsList();
  }, []);

  return (
    <div className='mt-12'>
      <h1 className="title">
        CMS
      </h1>

      <p className="text-3xl">Pagina prodotti</p>

      <hr className='my-8' />

      <CMSProductsSidebar
        activeProduct={state.activeProduct}
        onCloseClick={actions.removeActiveProduct}
        createProduct={actions.createProduct}
        editProduct={actions.editProduct}
      />

      {state.pending && <div><Spinner /></div>}
      {state.error && <div><Error errorMessage={state.error} /></div>}

      <CMSProductsList
        activeProduct={state.activeProduct}
        onDeleteProduct={actions.deleteProduct}
        onProductClick={actions.setActiveProduct}
        products={state.products}
      />

      <div className='mt-10'>
        <button className="btn primary animated-button flex items-center gap-3" onClick={() => actions.setActiveProduct({})}>
          <FontAwesomeIcon icon={faPlus} />
          Add new product
        </button>
      </div>

    </div>
  )
}

export default CMSProducts