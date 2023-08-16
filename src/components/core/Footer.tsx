import { NavLink, useNavigate } from 'react-router-dom';

import { faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAuth } from '@/services/auth';
import { IfLogged } from '..';

export const Footer = () => {

    const navigate = useNavigate();
    const executeLogout = useAuth(state => state.logout);

    const handleLogout = () => {
        executeLogout();

        navigate('/login');
    }


    return (
        <div className='fixed bottom-3 right-3'>
            <div className="flex items-center">
                <NavLink to='CMS' className="btn accent lg animated-button">
                    CMS
                </NavLink>
                <IfLogged
                    alternativeComponent={
                        <NavLink to='login' className="btn accent lg animated-button w-fit flex items-center gap-3">
                            Login
                            <FontAwesomeIcon icon={faRightToBracket} />
                        </NavLink>
                    }
                >
                    <button onClick={handleLogout} className="btn primary lg animated-button w-fit flex items-center gap-3">
                        Logout
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                </IfLogged>
            </div>

        </div>
    )
}
