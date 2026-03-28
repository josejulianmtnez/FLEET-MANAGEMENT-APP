import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { User } from '../../../infrastructure/interfaces/user.response';

export const authUseCase = async (fetcher: HttpAdapter, email: string, password: string): Promise<User> => {

    try {
        const login = await fetcher.post<User>(`/auth/login`, {
            email: email,
            password: password,
        });
        return login;

    } catch (error: any) {
        throw new Error(`Cannot login: ${error.message}`);
    }
}
