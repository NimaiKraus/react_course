import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCartItemList, getTotalCartPrice, useCart } from "@/services";
import { OrderStatus, User } from '@/model/Order';
import { useOrdersServices } from "@/services/orders";
import { CartItem } from "@/types";

export interface OrderToEmit {
    user: User;
    order: CartItem[];
    status: OrderStatus;
    total: number;
}

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const useCheckout = () => {
    const [user, setUser] = useState<User>({ name: '', email: '' });
    const [dirty, setDirty] = useState<boolean>(false);

    const navigate = useNavigate();

    const clearCart = useCart(state => state.clearCart);
    const totalCartCost = useCart(getTotalCartPrice);
    const order = useCart(getCartItemList);

    const { actions, state } = useOrdersServices();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        setUser((prevUser: User) => ({ ...prevUser, [name]: value }))
        setDirty(true);
    }

    const emitOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const orderToEmit: OrderToEmit = {
            user,
            order,
            status: 'pending',
            total: totalCartCost
        }
        // console.log("🚀 ~ file: useCheckout.ts:37 ~ emitOrder ~ orderInfo:", orderInfo)

        actions.createOrder(orderToEmit)
        .then((res) => {
            if (res) {
                clearCart();
                navigate('/thanks')
            }
        });
    }

    const isNameValid = user.name.length;
    const isEmailValid = user.email.match(EMAIL_REGEX);

    const isFormValid = isNameValid && isEmailValid;

    return {
        validators: {
            isNameValid,
            isEmailValid,
            isFormValid
        },
        actions: {
            emitOrder,
            handleInputChange
        },

        dirty,
        user,
        error: state.error
    }
}

