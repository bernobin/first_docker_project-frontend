export abstract class HttpClient {
    protected async request<T>(url: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(url, {
            ...options,
            headers: {
                Accept: 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw await this.createHttpError(response);
        }

        return this.parseResponse<T>(response);
    }

    protected get<T>(url: string): Promise<T> {
        return this.request<T>(url);
    }

    protected post<T>(url: string, data: unknown): Promise<T> {
        return this.request<T>(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    protected put<T>(url: string, data: unknown): Promise<T> {
        return this.request<T>(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    protected delete<T = void>(url: string): Promise<T> {
        return this.request<T>(url, {
            method: 'DELETE',
        });
    }

    private async createHttpError(response: Response): Promise<Error> {
        // Central place for parsing API errors.
        return new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    private async parseResponse<T>(response: Response): Promise<T> {
        if (response.status === 204) {
            return undefined as T;
        }

        return response.json() as Promise<T>;
    }
}
