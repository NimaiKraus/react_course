import React from 'react'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='fixed bottom-3 right-3'>
            <div className="flex items-center">
                <NavLink to='login' className="btn accent lg animated-button">
                    Login
                </NavLink>
                <NavLink to='CMS' className="btn primary lg animated-button">
                    CMS
                </NavLink>
                <button className="btn accent lg animated-button">
                    Logout
                </button>
            </div>

        </div>
    )
}

export default Footer;