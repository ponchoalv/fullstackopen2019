import React from 'react'
import { connect } from 'react-redux'
import { saveComment } from '../reducers/blogsReducer'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3)
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2),
  },
  card: {
    maxWidth: "80%",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  title: {
    fontSize: 16
  }
}))

const Comments = props => {
  const classes = useStyles()
  const submitForm = event => {
    event.preventDefault()
    const message = event.target.message.value
    event.target.message.value = ''
    props.saveComment(props.blogId, message)
  }

  return (
    <Container className={classes.container}> 
      <CssBaseline />
      <Typography component="h4" variant="h4">
        Comments
      </Typography>
      <form onSubmit={submitForm} className={classes.form}>
        <TextField
          margin="normal"
          variant="outlined"
          required
          fullWidth
          id="message"
          label="message"
          name="message"
          autoFocus
        />
        <Button variant="contained" color="primary">
          add comment
        </Button>
      </form>

      {props.comments.map(comment => (
        <Card key={comment.id} className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {comment.message}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  )
}

const getComments = (state, props) => {
  const blog = state.blogs.find(b => b.id === props.blogId)
  return blog.comments
}

const mapStateToProps = (state, props) => {
  return {
    comments: getComments(state, props),
    blogId: props.blogId
  }
}

const mapDispatchToProps = {
  saveComment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)
