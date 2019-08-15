import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2)
  },
  inline: {
    display: 'inline'
  }
}))

const UserDetails = props => {
  const classes = useStyles()

  if (props.user === undefined) {
    return null
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h4" variant="h4">
        {props.user.name}
      </Typography>
      <Typography component="h6" variant="subtitle1">
        added blogs
      </Typography>
      <List className={classes.root}>
        {props.user.blogs.map((blog, index) => (
          <div key={blog.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>B</Avatar>
              </ListItemAvatar>
              <ListItemText>
              <Link component={RouterLink} to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </ListItemText>
            </ListItem>
            {index !== props.user.blogs.length - 1 && <Divider variant="inset" component="li" />}
          </div>
        ))}
      </List>
    </Container>
  )
}

const filteredUser = (state, userId) => {
  console.log(userId)
  console.log(state)
  return state.userBlogs.find(u => userId === u.id)
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: filteredUser(state, ownProps.userId)
  }
}

export default connect(mapStateToProps)(UserDetails)
