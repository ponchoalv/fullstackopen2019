import React from 'react'
import { connect } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'
import Comments from './Comments'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import TrashIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12,
    fontSize: 13
  },
  likes: {
    marginBottom: 4
  }
})

const BlogDetail = props => {
  const classes = useStyles()

  if (props.blog === undefined) {
    return null
  }

  return (
    <Container>
      <CssBaseline />
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.blog.author}
          </Typography>
          <Typography variant="h5" component="h2">
            {props.blog.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <Link href={props.blog.url}>{props.blog.url}</Link>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            added by {props.blog.user.name}
          </Typography>
          <Typography className={classes.likes} color="textSecondary">
            {props.blog.likes} likes
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="like"
            onClick={() => props.likeHandler(props.blog)}
          >
            <FavoriteIcon />
          </IconButton>
          {props.user.username === props.blog.user.username && (
            <IconButton
              aria-label="delete"
              onClick={() => props.removeHandler(props.blog)}
            >
              <TrashIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>

      <Comments blogId={props.blog.id} />
    </Container>
  )
}

const findBlogById = (state, ownProps) => {
  return state.blogs.find(b => b.id === ownProps.blogId)
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: findBlogById(state, ownProps),
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    likeHandler: blog => {
      try {
        dispatch(like(blog.id))
      } catch (error) {
        dispatch(notify(`${error.response.data.error}`, 'error', 3))
      }
    },
    removeHandler: blog => {
      const confirmation = window.confirm(
        `remove ${blog.title} by ${blog.author}`
      )

      if (confirmation) {
        try {
          dispatch(deleteBlog(blog.id))
        } catch (error) {
          dispatch(notify(`${error.response.data.error}`, 'error', 3))
        }
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogDetail)
