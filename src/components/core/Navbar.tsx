import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/developer-logo.png'

import { useCartPanel } from '@/services/cart/useCartPanel';
import { useCart } from '@/services/cart/useCart';
import { getTotalCartItems, isCartEmpty } from '@/services/cart/cart.selectors';
import { CartPanel } from '..';


export const Navbar = () => {
  const isCartPanelOpened = useCartPanel(state => state.isCartPanelOpen);
  const toggleCartPanel = useCartPanel(state => state.toggleIsCartPanelOpen);

  const numberOfProductsAddedToCart = useCart(getTotalCartItems);
  const isEmpty = useCart(isCartEmpty);
  
  const getLinkClassname = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'text-pink-500 font-bold text-4xl transition cursive-font' : 'font-bold text-4xl transition cursive-font'
  }

  return (
    <div className='fixed z-10 top-0 left-0 right-0 shadow-2xl'>
      <div className="bg-slate-900 h-20 flex justify-between items-center px-5 py-3">

        <div className="flex items-center gap-3">
          <img src={logo} alt="logo developer" className='w-16 object-contain' />
          <NavLink className={getLinkClassname} to='shop'>Shop</NavLink>
        </div>

        <button disabled={isEmpty} className="btn accent lg animated-button flex items-center gap-2" onClick={toggleCartPanel}>
          {/* <i className="fa-solid fa-cart-shopping"></i> */}
          <FontAwesomeIcon icon={faShoppingCart} />
          <p>Cart: {numberOfProductsAddedToCart}</p>
        </button>

        {isCartPanelOpened && <CartPanel />}
      </div>
    </div>
  )
}
