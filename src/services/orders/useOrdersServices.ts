import { useReducer } from "react";
import { OrderState, OrdersReducer } from "./orders.reducer";
import { createDbOrder, deleteDbOrder, getDbOrdersList, updateDbOrderStatus } from "./orders.api";
import { Order, OrderStatus } from "@/model/Order";
import { OrderToEmit } from "@/pages/Checkout/hooks/useCheckout";

const initialState: OrderState = {
    error: null,
    pending: false,
    orders: []
}

export const useOrdersServices = () => {
    const [state, dispatch] = useReducer(OrdersReducer, initialState);

    const getOrdersList = async () => {
        try {
            const response = await getDbOrdersList()

            dispatch({type: 'ordersFetchedSuccessfully', payload: response.items})
        } catch (error) {
            dispatch({type: 'error', payload: 'Something went wrong while tryng to fetch orders!'})
        }
    }
    
    const createOrder = async (newOrder: OrderToEmit) => {
        try {
            const response = await createDbOrder(newOrder);
            
            dispatch({type: 'orderCreatedSuccessfully', payload: response});

            return response;
            
        } catch (error) {
            dispatch({type: 'error', payload: 'Something went wrong while tryng to create an order!'})
        }
    }

    const deleteOrder = async (orderId: string) => {
        try {
            await deleteDbOrder(orderId);

            dispatch({type: 'orderDeletedSuccessfully', payload: orderId})
        } catch (error) {
            dispatch({type: 'error', payload: `Something went wrong while tryng to delete order with id: ${orderId}`})
        }
    }
    
    const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
        try {
            const response = await updateDbOrderStatus(orderId, status);
            
            dispatch({type: 'orderUpdatedSuccessfully', payload: response})
        } catch (error) {
            dispatch({type: 'error', payload: `Something went wrong while tryng to update order with id: ${orderId}`})
        }
    }

    return {
        state,
        actions: {
            getOrdersList,
            createOrder,
            deleteOrder,
            updateOrderStatus
        }
    }
}