import React, { useState, useEffect } from 'react'
import {
  Button,
  Typography,
  Grid
} from '@material-ui/core'
import DocumentTitle from 'react-document-title'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks, resetTasks } from 'utils/tasks/actions'
import Loader from 'components/Loader'
import Task from 'components/Task'
import CreateTaskModal from 'components/CreateTaskModal'
import useStyles from './styles'


const HomePage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const tasks = useSelector(state => state.tasks.tasks)
  const tasksNext = useSelector(state => state.tasks.tasksNext)
  const isLoadingTasks = useSelector(state => state.tasks.isLoadingTasks)
  const [showTaskModal, setShowTaskModal] = useState(false)

  useEffect(() => {
    dispatch(getTasks())
    return () => dispatch(resetTasks())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onCreateTaskClick = () => {
    setShowTaskModal(true)
  }

  const renderTasks = () => {
    if (!tasks || tasks.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography variant='h4' color='textPrimary' className={classes.noTasks}>
            No tasks created for this user
          </Typography>
        </Grid>
      )
    }
    return tasks.map((task, index) => (
      <Task
        {...task}
        key={`task-${index}`}
      />
    ))
  }

  const handleTasksScroll = (event) => {
    const { scrollTop, scrollHeight, offsetHeight } = event.currentTarget
    const shouldScroll = scrollHeight === scrollTop + offsetHeight
    if (shouldScroll && tasksNext  && !isLoadingTasks) {
      dispatch(getTasks(tasksNext))
    }
  }

  return (
    <>
      <DocumentTitle title='Home | Task manager' />
      <div className={classes.homePage}>
        <Typography variant='h3' color='textPrimary' className={classes.header}>
          Home Page
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={onCreateTaskClick}
          >
            Create new task
          </Button>
        </Typography>
        {
          showTaskModal &&
            <CreateTaskModal
              open={showTaskModal}
              onClose={() => setShowTaskModal(false)}
            />
        }
        <Grid
          container
          spacing={2}
          className={classes.tasksWrapper}
          onScroll={handleTasksScroll}
        >
          {
            renderTasks()
          }
          {
            isLoadingTasks &&
              <div className={classes.loaderWrapper}>
                <Loader />
              </div>
          }
        </Grid>
      </div>
    </>
  )
}

export default HomePage
