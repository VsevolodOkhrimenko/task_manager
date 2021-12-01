import {
  GET_TASKS,
  SET_TASKS,
  GET_TASKS_ERROR,
  RESET_TASKS
} from './types'

const initialState = {
  tasks: [],
  tasksNext: null,
  isLoadingTasks: false
}

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        isLoadingTasks: true
      }
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        tasksNext: action.payload.tasksNext,
        isLoadingTasks: false
      }
    case GET_TASKS_ERROR:
      return {
        ...state,
        isLoadingTasks: false
      }
    case RESET_TASKS:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default tasksReducer
