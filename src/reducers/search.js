import produce from 'immer'
import { searchActions as actions } from "../actions/actionTypes"

const initialState = {
  searchKey: ''
}

const searchKeyChanged = (state, searchKey) => produce(state, draft => {
  draft.searchKey = searchKey
})

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SEARCH_KEY_CHANGE: {
      return searchKeyChanged(state, action.payload)
    }
    default:
      return state;
  }
}