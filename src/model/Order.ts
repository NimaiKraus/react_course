import { CartItem } from "@/types";

export interface Order {
    collectionId:   string;
    collectionName: string;
    created:        string;
    id:             string;
    order:          CartItem[];
    status:         OrderStatus;
    total:          number;
    updated:        string;
    user:           User;
}

export interface User {
    name: string,
    email: string
};

export type OrderStatus = 'pending' | 'done';

