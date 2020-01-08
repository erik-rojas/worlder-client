import { getActionType } from './utils';

const prefix = 'action.register';

export const UPDATE_REGISTER = getActionType(prefix)('UPDATE_REGISTER');

export const updateRegister = (data) => ({
    type: UPDATE_REGISTER,
    data
})
