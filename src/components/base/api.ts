/**
 * Вспомогательный тип, позволяющий развернуть ответ с количеством бъектов
 */
export type ApiListResponse<T> = {
    /**
     * Всего объектов в овтете от бэкенда
     */
    total: number,
    /**
     * Массив объектов в ответе от бэкенда
     */
    items: T[]
};

/**
 * Тип запроса
 */
export enum ApiMethods {
    /**
     * GET - запрос
     */
    GET = 'GET',
    /**
     * POST - запрос
     */
    POST = 'POST'
}

/**
 * Интерфейс для обмена данными с бэкендом
 */
export interface IApiDataProvider {
    /**
     * Базовый адресс для всех ендпоинтов
     */
    readonly baseUrl: string;

    /**
     * GET запрос
     * @param uri - endpoint для доступа. Будет совмещен с {@link IApiDataProvider.baseUrl}
     * @return Promise<T> - возвращает обещание предоставить данные по итогу запроса
     * @throws Error Если произошла ошибка при выполнении.
     */
    get<T>(uri: string): Promise<T>;

    /**
     * GET запрос
     * @param uri - endpoint для доступа. Будет совмещен с {@link IApiDataProvider.baseUrl}
     * @return Promise<Blob> - возвращает обещание загрузить данные
     * @throws Error Если произошла ошибка при выполнении.
     */
    getBlob(uri: string): Promise<Blob>;

    /**
     * POST запрос
     * @param uri - endpoint для доступа. Будет совмещен с {@link IApiDataProvider.baseUrl}
     * @param data - объект с данными, которые будут помещены в тело запроса
     * @param options - RequestInit запроса. Необходимо указать тип запроса
     */
    post<T, U>(uri: string, data: U, options?: RequestInit): Promise<T>;
}

/**
 * Реализация {@link IApiDataProvider} по умолчанию.
 */
export class DefaultApiDataProvider implements IApiDataProvider {
    readonly baseUrl: string;
    private readonly options: RequestInit;

    /**
     * Создание объекта
     * @param baseUrl - базовый урл
     * @param options - параметры для всех запросов. Например, headers
     */
    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers ?? {})
            }
        };
    }

    /**
     * GET запрос. Являетс реализацией {@link IApiDataProvider.get}
     * @param uri - endpoint для доступа. Будет совмещен с {@link IApiDataProvider.baseUrl}
     * @return Promise<T> - возвращает обещание предоставить данные типа Т по итогу запроса
     * @throws Error Если произошла ошибка при выполнении.
     */
    async get<T>(uri: string) {
        const requestUri = this.baseUrl + uri;

        const requestInit = {
            ...this.options,
            method: ApiMethods.GET
        }

        const response = await fetch(requestUri, requestInit)

        return await this.handleResponse<T>(response);
    }

    /**
     * GET запрос. Являетс реализацией {@link IApiDataProvider.getBlob}
     * @param uri - endpoint для доступа. Будет совмещен с {@link IApiDataProvider.baseUrl}
     * @return Promise<T> - возвращает обещание предоставить данные типа Т по итогу запроса
     * @throws Error Если произошла ошибка при выполнении.
     */
    async getBlob(uri: string) {
        const requestUri = this.baseUrl + uri;

        const requestInit = {
            ...this.options,
            method: ApiMethods.GET
        }

        const response = await fetch(requestUri, requestInit)

        return await response.blob()
    }

    /**
     * POST запрос. Являетс реализацией {@link IApiDataProvider.post}
     * @param uri - endpoint для доступа. Будет совмещен с {@link IApiDataProvider.baseUrl}
     * @param data - объект с данными, которые будут помещены в тело запроса
     */
    async post<T, U>(uri: string, data: U) {
        const requestUri = this.baseUrl + uri

        const requestInit = {
            ...this.options,
            method: ApiMethods.POST,
            body: JSON.stringify(data)
        }

        const response = await fetch(requestUri, requestInit)

        return await this.handleResponse<T>(response);
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const responseObject = await response.json();

        if (response.ok) return responseObject;

        throw new Error(responseObject.error ?? response.statusText);
    }
}
