import axios from 'axios'
import { useReducer, useEffect } from "react"
import { reducer, initialState } from './reducer'
import {
  JOB_GET_REQUEST,
  JOB_GET_SUCCESS,
  JOB_GET_FAIL,
  JOB_GET_HAS_NEXT_PAGE,
} from './constants'

const useGetJobs = (params, page) => {
  const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source()
    const cancelToken2 = axios.CancelToken.source()
    dispatch({type: JOB_GET_REQUEST})
    axios.get(BASE_URL, {
      cancelToken: cancelToken1.token,
      params: {markdown: true, page: page, ...params}
    }).then(res => {
      dispatch({type: JOB_GET_SUCCESS, payload: res.data})
    }).catch(error => {
      if (axios.isCancel(error)) return
      dispatch({type: JOB_GET_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message})
    })

    axios.get(BASE_URL, {
      cancelToken: cancelToken2.token,
      params: {markdown: true, page: page + 1, ...params}
    }).then(res => {
      dispatch({type: JOB_GET_HAS_NEXT_PAGE, payload: res.data.length !== 0})
    }).catch(error => {
      if (axios.isCancel(error)) return
      dispatch({type: JOB_GET_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message})
    })

    return () => {
      cancelToken1.cancel()
      cancelToken2.cancel()
    }
  }, [params, page])

  return state
}
export default useGetJobs;