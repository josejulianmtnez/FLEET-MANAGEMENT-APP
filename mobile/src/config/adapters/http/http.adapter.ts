export abstract class HttpAdapter {
    abstract get<T>( url: string, options?: Record<string, unknown> ): Promise<T>;
    abstract post<T>(url: string, data: unknown, options?: Record<string, unknown>): Promise<T>;
}
