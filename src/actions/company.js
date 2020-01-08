import {
  GET_ALL_COMPANIES,
  GET_COMPANY_DETAIL
} from "./actionTypes";
import request from "../api/request";

export function set_companies(data) {
  return {
    type: GET_ALL_COMPANIES,
    data
  };
}

export function set_company_detail(data) {
  return {
    type: GET_COMPANY_DETAIL,
    data
  };
}

export function getAllCompanies(city = null, country = null) {
  return dispatch => {
    return request()
      .get(`/company?city=${city !== null ? city : ""}&country=${country !== null ? country : ""}`)
      .then(response => {
        dispatch(set_companies(response.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getCompanyDetail(id) {
  return dispatch => {
    return request()
      .get(`/company/${id}`)
      .then(response => {
        dispatch(set_company_detail(response.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default {
  getAllCompanies,
  getCompanyDetail,
};
