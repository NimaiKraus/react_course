import { Order, OrderStatus } from "@/model/Order";
import { OrderToEmit } from "@/pages/Checkout/hooks/useCheckout";
import { pocketbase } from "@/pocketbase"

export const getDbOrdersList = () => {
    return pocketbase.collection('orders').getList<Order>();
}

export const createDbOrder = (newOrder: OrderToEmit) => {
    return pocketbase.collection('ordersX').create<Order>(newOrder);
}

export const deleteDbOrder = (orderId: string) => {
    return pocketbase.collection('orders').delete(orderId);
}

export const updateDbOrderStatus = (orderId: string, status: OrderStatus) => {
    return pocketbase.collection('orders').update<Order>(orderId, {status})
}