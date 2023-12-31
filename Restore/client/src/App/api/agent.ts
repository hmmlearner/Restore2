import axios, { AxiosError, AxiosResponse } from "axios";
import { Agent, request } from "https";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) =>  response.data;


axios.interceptors.response.use(async response => {
    await sleep();

    console.log('response from API call ' + JSON.stringify(response));
        return response
    
}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const errorString: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        errorString.push(data.errors[key]);
                    }
                }
                throw errorString.flat(); // flattens array [[1,2],[3,4]] becomes [1,2,3,4]
            }
            break;
        case 500:
            router.navigate('/server-error', { state: { error: data } });
            break;
        default:

    }

    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const TestErrors = {
    get400Errors: () => requests.get('buggy/bad-request'),
    get404Errors: () => requests.get('buggy/not-found'),
    get401UnAuthorizedErrors: () => requests.get('buggy/unauthorized'),
    getValidationErrors: () => requests.get('buggy/validation-error'),
    get500ServerErrors: () => requests.get('buggy/server-error')
}

const Catalogue = {
    list: () => requests.get('products'),
    details: (id: number) =>  requests.get(`products/${id}`) 
}

const Basket = {
    get: () => requests.get("basket"),
    addItem: (productId: number, quantity:number = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity:number = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalogue,
    TestErrors,
    Basket
}

export default agent; 

