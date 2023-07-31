import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../assets/developer-logo.png'

const Navbar = () => {
  const getLinkClassname = ({isActive}: {isActive: boolean}): string => {
    return isActive ? 'text-pink-500 font-bold text-xl transition' : 'font-bold text-xl transition'
  }

  return (
    <div className='fixed z-10 top-0 left-0 right-0 shadow-2xl'>
        <div className="bg-slate-900 h-20 flex justify-between items-center px-5 py-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo developer" className='w-16 object-contain' />
            <NavLink className={getLinkClassname} to='shop'>Shop</NavLink>
          </div>
          <button className="btn accent lg animated-button">
            Cart: 0
          </button>
        </div>
    </div>
  )
}

export default Navbar;
