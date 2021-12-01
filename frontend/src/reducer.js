import { combineReducers } from 'redux'
import authReducer from 'utils/auth/authReducer'
import commonReducer from 'utils/common/commonReducer'
import tasksReducer from 'utils/tasks/tasksReducer'


const reducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  tasks: tasksReducer
})

export default reducer
