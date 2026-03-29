import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()( (set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (email: string, password: string) => {
        const res = await authLogin(email, password);
        if (!res){
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return false;
        }

        await StorageAdapter.setItem('token', res.token);
        set({ status: 'authenticated', token: res.token, user: res.user });

        return true;
    },
    checkStatus: async () => {
        const res = await authCheckStatus();
        if (!res){
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return;
        }

        await StorageAdapter.setItem('token', res.token);
        set({ status: 'authenticated', token: res.token, user: res.user });
    },
    logout: async () => {
        await StorageAdapter.removeItem('token');
        set({ status: 'unauthenticated', token: undefined, user: undefined });
    }
}));
