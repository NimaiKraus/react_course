import { NavLink } from 'react-router-dom';

const Thanks = () => {
  return (
    <div className='mt-20 flex flex-col items-center justify-center gap-11'>
      <h1 className="title">Thanks</h1>

      <h1 className='cursive-font font-bold text-9xl text-center'>Thank You for your order!</h1>

      <NavLink to={'/shop'} className="btn primary animated-button lg w-fit">
        Back to the shop
      </NavLink>
    </div>
  )
}

export default Thanks;
