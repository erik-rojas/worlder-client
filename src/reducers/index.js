import { combineReducers } from 'redux'

import session from "./session";
import auth from './auth';
import register from './register';
import loading from './loading';
import company from './company';
import seeker from './seeker';
import search from './search'

export default combineReducers({
    session,
    auth,
    register,
    loading,
    company,
    seeker,
    search
})