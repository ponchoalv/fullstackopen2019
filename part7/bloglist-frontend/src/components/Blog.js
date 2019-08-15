import React from "react";
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const Blog = ({ blog }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>B</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap component={Link} to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Blog;
