import { Order } from "@/model/Order";
import { OrdersReducerAction } from "./orders.actions";

export interface OrderState {
    pending: boolean,
    error: string | null,
    orders: Order[],
}

export const OrdersReducer = (state: OrderState, action: OrdersReducerAction) => {
    const {type, payload} = action;

    switch (type) {
        case "orderCreatedSuccessfully":
            return {...state, orders: [...state.orders, payload], pending: false, error: null};
        case "orderDeletedSuccessfully":
            return {...state, orders: state.orders.filter(order => order.id !== payload), pending: false, error: null};
        case "orderUpdatedSuccessfully":
            return {...state, orders: state.orders.map(order => order.id === payload.id ? payload : order), pending: false, error: null};
        case "ordersFetchedSuccessfully":
            return {...state, orders: payload, pending: false, error: null};
        case "pending":
            return {...state, pending: payload, error: null};
        case "error":
            return {...state, pending: false, error: payload};
    
        default:
            break;
    }
}