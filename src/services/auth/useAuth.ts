import { create } from "zustand";

import * as AuthService from './auth.api';

export interface AuthState {
    token: string | null,
    login: (username: string, password: string) => void,
    logout: () => void,
    error: boolean,
    isLogged: boolean
}

export const useAuth = create<AuthState>((set) => ({
    token: AuthService.getToken(),
    login: async (username, password) => {
        set({isLogged: false, error: false})

        try {
            await AuthService.login(username, password);
            set({isLogged: true, token: AuthService.getToken()})
        } catch (error) {
            set({isLogged: false, error: true})
        }
    },
    logout: () => {
        AuthService.logout();
        set({isLogged: false, token: null})
    },
    error: false,
    isLogged: AuthService.isLogged()
}))