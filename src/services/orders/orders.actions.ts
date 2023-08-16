import { Order } from "@/model/Order";

export interface OrdersFetchedSuccessfully {type: 'ordersFetchedSuccessfully', payload: Order[]}; 
export interface OrderCreatedSuccessfully {type: 'orderCreatedSuccessfully', payload: Order}; 
export interface OrderDeletedSuccessfully {type: 'orderDeletedSuccessfully', payload: string};
export interface OrderUpdatedSuccessfully {type: 'orderUpdatedSuccessfully', payload: Order};
export interface PendingAction { type: 'pending', payload: boolean };
export interface ErrorAction { type: 'error', payload: string };

export type OrdersReducerAction = OrdersFetchedSuccessfully | OrderCreatedSuccessfully | OrderDeletedSuccessfully | OrderUpdatedSuccessfully | PendingAction | ErrorAction;