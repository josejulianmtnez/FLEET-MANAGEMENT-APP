import { atjrApi } from "../../config/api/atjrApi";
import { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.response";

const returnUserToken = (data: AuthResponse) => {
    const user: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
    }

    return {
        user: user,
        token: data.token,
    }
}

export const authLogin = async (email: string, password: string) => {

    email = email.toLowerCase();

    try {
        const { data } = await atjrApi.post<AuthResponse>('/auth/login', { email, password });
        return returnUserToken(data);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await atjrApi.get<AuthResponse>('/auth/check-status');
        return returnUserToken(data);
    } catch (error) {
        console.log(error);
        return null;
    }
}
