import { searchActions } from "./actionTypes"
import { createAction } from './utils'

export const searchKeyChangedAction = (searchKey) => dispatch => {
  dispatch(createAction(searchActions.SEARCH_KEY_CHANGE, searchKey));
}
