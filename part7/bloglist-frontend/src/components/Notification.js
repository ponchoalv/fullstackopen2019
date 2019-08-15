import React from 'react'
import { connect } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'
import clsx from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import CloseIcon from '@material-ui/icons/Close'
import { amber, green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { makeStyles } from '@material-ui/core/styles'

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
}

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  margin: {
    margin: theme.spacing(1)
  }
}))

const Notification = props => {
  const classes = useStyles()

  if (!props.notification.show) {
    return null
  }

  const variant = props.notification.notificationClassName
  const Icon = variantIcon[variant]

  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={true}>
      <SnackbarContent
        className={clsx(classes[variant], classes.magin)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {props.notification.message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={props.removeNotification}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}
const mapDispatchToProps = {
  removeNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
