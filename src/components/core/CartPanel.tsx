import { useNavigate } from "react-router-dom";

import { getCartItemList, getTotalCartPrice, useCart, useCartPanel } from "@/services";

export const CartPanel = () => {
    const navigate = useNavigate();

    const cartItems = useCart(getCartItemList);

    const closeCartPanel = useCartPanel(state => state.closeCartPanel)

    const goToCart = () => {
        closeCartPanel();
        navigate('cart');
    }

  return (
    <div className='fixed top-[94px] right-4 bg-slate-900 shadow-2xl rounded-xl p-3 w-96 cart-panel-container'>
        <ul className="flex flex-col gap-6">
            {cartItems.map((cartItem) => (
                <li key={cartItem.product.id} className="flex justify-between items-center">
                    <p>{cartItem.product.name}</p>
                    <div className="flex justify-between items-center min-w-[30%]">
                        <div>({cartItem.quantity} x € {cartItem.product.cost})</div>
                        <div>€ {cartItem.quantity * cartItem.product.cost}</div>
                    </div>
                </li>
            ))}

            <div className="text-end font-bold text-xl mt-3 border-t pt-2 border-slate-600">Total: € {useCart(getTotalCartPrice)}</div>

            <div className="flex justify-center">
                <button className="btn primary animated-button" onClick={goToCart}>Go to cart</button>
            </div>
        </ul>
    </div>
  )
}
