import axios from "axios";
import { _store } from "index";
import { API_URL } from "config";
import { logoutAuth } from 'actions/auth'

import { updateLoading as fetchingServer } from 'actions/loading' 

/**
 * 
 * @param {*} data: response data 
 */

const debugData = data => {
    _store.dispatch(fetchingServer(false));
    return Promise.resolve(data);
}

/**
 * 
 * @param {*} er: error from request 
 */

const debugError = er => {
    _store.dispatch(fetchingServer(false));

    if (er.response && er.response.statusText === 'Unauthorized') {
        window.location.href = "/login";
        _store.dispatch(logoutAuth());
    }
    return Promise.reject(er);
}

/**
 * Request configration
 */

const request = () => {
    const token = _store.getState().auth.token;

    const axiosApi = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `Token ${token}`
        }
    });

    _store.dispatch(fetchingServer(true));

    return {
        get(url, options = {}) {
            return axiosApi.get(url).then(debugData).catch(debugError)
        },
        post(url, data, options = {}) {
            return axiosApi.post(url, data).then(debugData).catch(debugError)
        },
        put(url, data, options = {}) {
            return axiosApi.put(url, data).then(debugData).catch(debugError)
        },
        delete(url, options = {}) {
            return axiosApi.delete(url).then(debugData).catch(debugError)
        },
    }
}


export default request;