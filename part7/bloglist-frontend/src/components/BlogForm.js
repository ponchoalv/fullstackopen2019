import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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

const BlogForm = ({ addBlog, title, author, url }) => {
  const classes = useStyles()

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
            {...title}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
            autoFocus
            {...author}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="url"
            label="Url"
            name="url"
            autoFocus
            {...url}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >create
          </Button>
        </form>
      </div>
    </Container>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm
