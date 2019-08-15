import React from 'react'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = drawerWidth =>
  makeStyles(theme => ({
    root: {
      display: 'flex'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  }))

const AppContent = props => {
  const classes = useStyles(props.drawer.width)()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.drawerHeader} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: !props.drawer.open
        })}
      >
        {props.children}
      </main>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    drawer: state.drawer,
    children: ownProps.children
  }
}

export default connect(mapStateToProps)(AppContent)
