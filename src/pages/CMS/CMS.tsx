import { NavLink, Outlet } from 'react-router-dom';

const CMSPage = () => {
  const getLinkClassname = ({isActive}: {isActive: boolean}): string => {
    return isActive ? 'btn primary' : 'btn'
  }

  return (
    <div>

      <NavLink className={getLinkClassname} to='/cms/orders'>Orders</NavLink>
      <NavLink className={getLinkClassname} to='/cms/products'>Products</NavLink>

      <Outlet />
    </div>
  )
}

export default CMSPage;