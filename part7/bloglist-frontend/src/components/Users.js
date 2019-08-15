import React from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 240
  }
}))

const Users = props => {
  const classes = useStyles()

  return (
    <Container>
      <Typography component="h2" variant="h4">
        Users
      </Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users &&
              props.users.map(user => (
                <TableRow key={user.username}>
                  <TableCell component="th" scope="row">
                    <Link component={RouterLink} to={`/users/${user.id}`}>
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.blogs.length}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    users: state.userBlogs
  }
}

export default connect(mapStateToProps)(Users)
