import axios from 'axios';
import storage from './storage';
import { API_URL } from './index';

class InternalApi {
    static formatUrl = (url) => {
        return `${API_URL}/${url}`;
    }
    static headers = () => {
        if (storage.get('token') && storage.get('token').length > 0)
            return {
                'token': storage.get('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }
    static get(urlPath, params = {}, headers = {}) {
        const requestParams = Object.assign({}, {
            params,
            headers: Object.assign({}, headers, {
                ...InternalApi.headers,
            }),
        });
        return axios.get(InternalApi.formatUrl(urlPath), requestParams).then(
            res => res.data
        );
    }

    static post(urlPath, data = {}, headers = {}) {
        const requestParams = {
            headers: Object.assign({}, headers, {
                ...this.headers()
            }),
        };

        return axios.post(this.formatUrl(urlPath), data, requestParams).then(
            res => res.data
        );
    }

    static put(urlPath, data = {}, headers = {}) {
        const requestParams = {
            headers: Object.assign({}, headers, {
                'Content-Type': 'application/json',
                ...this.headers()
            }),
        };

        return axios.put(this.formatUrl(urlPath), data, requestParams).then(
            res => res.data
        );
    }

    static delete(urlPath, params = {}, headers = {}) {
        const requestParams = {
            params,
            headers: Object.assign({}, headers, {
                'Content-Type': 'application/json',
                ...this.headers()
            }),
        };

        return axios.delete(this.formatUrl(urlPath), requestParams).then(
            res => res.data
        );
    }

    static uploadFile(name, file, options = {}) {
        const data = new FormData();

        data.append(name, file);
        data.append('name', name);
        data.append('options', JSON.stringify(options));

        const requestParams = {
            headers: Object.assign({},
                {
                    ...this.headers()
                },
            ),
        };

        return axios.post(
            this.formatUrl('attachment/upload'),
            data,
            requestParams,
        ).then(
            res => res.data
        );
    }
}

export default InternalApi;
