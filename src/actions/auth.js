import { getActionType, createAction } from './utils';
import jwt_decode from 'jwt-decode';
import _request from '../api/request';


const prefix = 'action.auth';
export const UPDATE_AUTH = getActionType(prefix)('UPDATE_AUTH');
export const UPDATE_USER = getActionType(prefix)('UPDATE_USER');
export const REMOVE_AUTH = getActionType(prefix)('REMOVE_AUTH');
export const CHANGE_AVATAR = getActionType(prefix)('CHANGE_AVATAR');

export const updateAuth = (data = null) => dispatch => {
    if (data === null) {
        return _request().get('auth/profile').then(res => {
            if (res.data.data) {
                dispatch(createAction(UPDATE_AUTH, res.data.data));
            }
        })
    }

    if (data.token) {
        dispatch(createAction(UPDATE_AUTH, {
            ...jwt_decode(data.token),
            token: data.token
        }));
    } else {
        dispatch(createAction(UPDATE_AUTH, data));
    }

}

export const logoutAuth = () => dispatch => {
    localStorage.clear();
    dispatch(createAction(REMOVE_AUTH, {}));
}

export const updateUser = (user) => dispatch => {
    dispatch(createAction(UPDATE_USER, user));
}

export const changeAvatar = (avatar) => dispatch => {
    dispatch(createAction(CHANGE_AVATAR, avatar));
}
