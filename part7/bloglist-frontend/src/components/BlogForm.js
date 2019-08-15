import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogsReducer'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const BlogForm = props => {
  const classes = useStyles()

  const addBlog = async event => {
    event.preventDefault()
    props.newBlogFormRef.current.toggleVisibility()

    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    try {
      props.newBlog(blogObject)
      props.notify(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        'success',
        3
      )

      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
    } catch (error) {
      props.notify(`${error.response.data.error}`, 'error', 3)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h3">
          create new
        </Typography>
        <form onSubmit={addBlog} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="url"
            label="Url"
            name="url"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            create
          </Button>
        </form>
      </div>
    </Container>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    newBlogFormRef: ownProps.newBlogFormRef
  }
}

const mapDispatchToProps = {
  newBlog,
  notify
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)
