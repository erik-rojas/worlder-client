import * as actionLoading from '../actions/loading';
const defaultState = {
    loading: false
}

export default function(state = defaultState, {type, ...action}) {
    switch(type) {
        case actionLoading.UPDATE_LOADING: {
            return {loading: action.payload}
        }
        default: return state;
    }
}
