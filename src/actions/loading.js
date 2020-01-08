import { getActionType, createAction } from './utils';
const prefix = 'action.loading';

export const UPDATE_LOADING = getActionType(prefix)('UPDATE_LOADING');

export const updateLoading = (data=false) => dispatch => {
    dispatch(createAction(UPDATE_LOADING, data));
}
