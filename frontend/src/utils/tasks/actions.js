import {
  GET_TASKS,
  SET_TASKS,
  GET_TASKS_ERROR,
  RESET_TASKS
} from './types'
import axios from 'axios'
import Config from 'config'
import store from 'store'
import { checkErrorStatus, setSnackbar } from 'utils/common/actions'


const { apiUrl } = Config.network

export function getTasks(next) {
  return function action(dispatch) {
    dispatch({
      type: GET_TASKS
    })
    const url = next || `${apiUrl}tasks/`
    axios.get(url).then((body) => {
      const { data } = body
      if (next) {
        const { tasks } = store.getState().tasks
        dispatch({
          type: SET_TASKS,
          payload: {
            tasks: [...tasks, ...data.results],
            tasksNext: data.next
          }
        })
      } else {
        dispatch({
          type: SET_TASKS,
          payload: {
            tasks: data.results,
            tasksNext: data.next
          }
        })
      }
    }).catch(error => {
      dispatch({
        type: GET_TASKS_ERROR
      })
      if (error.response) {
        dispatch(checkErrorStatus(error.response.status))
      } else {
        dispatch(setSnackbar('Connection error', 'error'))
      }
    })
  }
}


export function setTasks(tasks) {
  return function action(dispatch) {
    const { tasksNext } = store.getState().tasks
    dispatch({
      type: SET_TASKS,
      payload: {
        tasks: tasks,
        tasksNext: tasksNext
      }
    })
  }
}

export function resetTasks() {
  return function action(dispatch) {
    dispatch({
      type: RESET_TASKS,
    })
  }
}
