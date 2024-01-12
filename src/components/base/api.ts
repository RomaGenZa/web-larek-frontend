<<<<<<< HEAD
<<<<<<< HEAD
export type ApiListResponse<Type> = {
=======
type ApiListResponse<Type> = {
>>>>>>> ca67ad2 (feat: add web-larek starter kit)
=======
export type ApiListResponse<Type> = {
>>>>>>> 855102b (fix: webpack env, markup bugs, add some utils)
    total: number,
    items: Type[]
};

<<<<<<< HEAD
<<<<<<< HEAD
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
=======
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

class Api {
>>>>>>> ca67ad2 (feat: add web-larek starter kit)
=======
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
>>>>>>> 855102b (fix: webpack env, markup bugs, add some utils)
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    protected handleResponse(response: Response): Promise<object> {
        if (response.ok) return response.json();
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    get(uri: string) {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(this.handleResponse);
    }

    post(uri: string, data: object, method: ApiPostMethods = 'POST') {
        return fetch(this.baseUrl + uri, {
            ...this.options,
<<<<<<< HEAD
<<<<<<< HEAD
            method,
=======
>>>>>>> ca67ad2 (feat: add web-larek starter kit)
=======
            method,
>>>>>>> 855102b (fix: webpack env, markup bugs, add some utils)
            body: JSON.stringify(data)
        }).then(this.handleResponse);
    }
}
