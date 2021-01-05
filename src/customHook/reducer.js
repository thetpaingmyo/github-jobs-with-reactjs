import {
  JOB_GET_REQUEST,
  JOB_GET_SUCCESS,
  JOB_GET_FAIL,
  JOB_GET_HAS_NEXT_PAGE,
} from './constants'

export const initialState = {
  jobs: [],
  loading: true,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case JOB_GET_REQUEST:
      return {loading: true, jobs: []}
    case JOB_GET_SUCCESS:
      return {...state, loading: false, jobs: action.payload}
    case JOB_GET_FAIL:
      return {...state, loading: false, error: action.payload, jobs: []}
    case JOB_GET_HAS_NEXT_PAGE:
      return {...state, hasNextPage: action.payload}
    default:
      return state
  }
}