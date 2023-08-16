import { faCreditCardAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import { getCartItemList, getTotalCartPrice, isCartEmpty, useCart } from "@/services"

const Cart = () => {
  const productsList = useCart(getCartItemList);
  const totalPrice = useCart(getTotalCartPrice);
  const isCarEmpty = useCart(isCartEmpty);

  const increaseQuantity = useCart(state => state.increaseQuantity);
  const decreaseQuantity = useCart(state => state.decreaseQuantity);

  return (
    <div className="w-full">
      <h1 className="title">Cart</h1>

      <ul>
        {productsList.map((item) => {
          return (
            <li key={item.product.id} className="flex flex-col gap-4 sm:flex-row justify-between items-center my-3 p-4">
              <div className="flex gap-4 items-center">
                <img src={item.product.tmb} alt={item.product.name} className="w-24 h-24 rounded-xl object-cover" />

                <p className="font-bold text-lg">{item.product.name}</p>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex items-center gap-3">
                  <button
                    className="btn primary"
                    onClick={() => decreaseQuantity(item.product.id)}
                  >
                    -
                  </button>

                  <p className="text-2xl font-semibold">Quantity: {item.quantity}</p>

                  <button
                    className="btn primary"
                    onClick={() => increaseQuantity(item.product.id)}
                  >
                    +
                  </button>
                </div>

                <div className="w-16 text-center text-xl font-semibold">€ {item.product.cost * item.quantity}</div>
              </div>
            </li>
          )
        })}

      </ul>

      <p className="text-end mr-6 mt-20 font-bold text-4xl">Total : € {totalPrice}</p>
      {!isCarEmpty &&
        <NavLink to='/checkout'>
          <button className="btn primary animated-button lg flex items-center gap-3">
            Proceed to checkout
            <FontAwesomeIcon icon={faCreditCardAlt} />
          </button>
        </NavLink>
      }
    </div>
  )
}

export default Cart