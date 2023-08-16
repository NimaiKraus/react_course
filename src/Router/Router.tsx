// import {lazy} from 'react';
import { useRoutes, Navigate   } from "react-router-dom";

import { CMSOrders, CMSPage, CMSProducts, Cart, Checkout, Login, Shop, Thanks } from "../pages";
import { PrivateRoute } from "@/components";

// const Cart = lazy(() => import('../pages/Cart/Cart'));

const Router = () => {
    return useRoutes([
        {
            path: 'shop',
            element: <Shop />
        },
        {
            path: 'cart',
            element: <Cart />
        },
        {
            path: 'checkout',
            element: <Checkout />
        },
        {
            path: 'thanks',
            element: <Thanks />
        },
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'cms',
            element: <PrivateRoute><CMSPage /></PrivateRoute>,
            children: [
                {
                    path: 'orders',
                    element: <CMSOrders />
                },
                {
                    path: 'products',
                    element: <CMSProducts />
                },
                {
                    index: true,
                    element: <CMSProducts />
                }
            ]
        },
        {
            path: '*',
            element: <Navigate to='shop' />
        }
    ])
}

export default Router