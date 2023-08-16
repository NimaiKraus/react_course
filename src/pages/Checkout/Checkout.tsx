import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCheckout } from "./hooks/useCheckout";
import { getTotalCartPrice, useCart } from "@/services";
import { Error } from "@/components";

const Checkout = () => {
  const { actions, dirty, user, validators, error } = useCheckout();

  const cartTotalPrice = useCart(getTotalCartPrice);

  return (
    <>
      <h1 className="title">Checkout</h1>
        {error && <Error errorMessage={error} />}
      <div className="max-w-[500px] h-[500px] mx-auto mt-20 bg-blue-200/30 flex items-center justify-center rounded-2xl">


        <form className="flex flex-col gap-3 w-[70%] backdrop-blur-3xl" onSubmit={actions.emitOrder}>

          <div className="text-5xl font-bold">
            Total: € {cartTotalPrice}
          </div>

          <hr className='mt-2 mb-6' />

          <label htmlFor="name" className="text-xl font-bold">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name..."
            value={user.name}
            onChange={actions.handleInputChange}
            className={!validators.isNameValid && dirty ? "p-2.5 rounded-xl error" : "p-2.5 rounded-xl"}
          />

          <label htmlFor="email" className="text-xl font-bold">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email..."
            value={user.email}
            onChange={actions.handleInputChange}
            className={!validators.isEmailValid && dirty ? "p-2.5 rounded-xl error" : "p-2.5 rounded-xl"}
          />

          <button
            type="submit"
            className="btn primary animated-button w-fit flex items-center gap-3 self-center"
            disabled={!validators.isFormValid}
          >
            Confirm order
            <FontAwesomeIcon icon={faCheckCircle} />
          </button>

        </form>
      </div>
    </>
  )
}

export default Checkout