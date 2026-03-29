import { useState } from 'react';
import * as UseCases from '../../core/use-cases';
import { backend } from '../../config/adapters/backend.adapter';
import { User } from '../../infrastructure/interfaces/auth.response';

export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [infoLogin, setInfoLogin] = useState<User | null>(null);

    const login = async (correo: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await UseCases.authUseCase(backend, correo, password);
            setInfoLogin(response);
            return { success: true, data: response };
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || 'Error al iniciar sesión';
            return { success: false, message: msg };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        infoLogin,
        isLoading,
        login,
    };
};
