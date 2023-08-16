import { AuthState } from "./useAuth";

export const getAuthToken = (state: AuthState) => state.token;
export const getAuthError = (state: AuthState) => state.error;
export const getAuthisLogged = (state: AuthState) => state.isLogged;