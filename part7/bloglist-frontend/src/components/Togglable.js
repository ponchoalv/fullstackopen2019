import React, { useState, useImperativeHandle } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  togleButton: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const Togglable = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const [visible, setVisible] = useState('')

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={hideWhenVisible}>
        <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.togleButton}
            onClick={toggleVisibility}
          >
            {props.buttonLabel}
          </Button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.togleButton}
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </Container>
  )
})

export default Togglable
