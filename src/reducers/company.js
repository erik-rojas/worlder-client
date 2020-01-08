import { GET_ALL_COMPANIES,
  GET_COMPANY_DETAIL } from "../actions/actionTypes";

const initState = {
  companies: [],
  company: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_ALL_COMPANIES:
      return {
        ...state,
        companies: action.data
      };
    case GET_COMPANY_DETAIL:
      console.log('action = ', action)
      return {
        ...state,
        company: action.data
      };

    default:
      return state;
  }
}
