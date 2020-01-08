import * as actionRegister from '../actions/register';
const defaultState = {
    fistName: '',
    lastName: '',
}

export default function (state = defaultState, { type, ...action }) {
    switch (type) {
        case actionRegister.UPDATE_REGISTER: {
            return action.data
        }
        default: return state;
    }
}
