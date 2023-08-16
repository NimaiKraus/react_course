import { pocketbase } from "@/pocketbase";

export const login = (username: string, password: string) => pocketbase.admins.authWithPassword(username, password);

export const logout = () => pocketbase.authStore.clear();

export const getToken = () => pocketbase.authStore.token;

export const isLogged = () => pocketbase.authStore.isValid;