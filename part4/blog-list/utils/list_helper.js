const dummy = blogs => {
  return 1
}

const totalLikes = blogs =>
  blogs.reduce((previous, current) => previous + current.likes, 0)

const favoriteBlog = blogs =>
  blogs.reduce((lastMax, current) =>
    lastMax.likes >= current.likes
      ? lastMax
      : current, {})

const groupBy = (xs, key) =>
  xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})

const mostBlogs = blogs => {
  const authorGrouped = Object.entries(groupBy(blogs, 'author')).map(author => {
    return {
      author: author[0],
      blogs: author[1].length,
    }
  })

  return authorGrouped.reduce((lastMax, current) =>
    lastMax.blogs >= current.blogs
      ? lastMax
      : current, {})
}

const mostLikes = blogs => {
  const authorGrouped = Object.entries(groupBy(blogs, 'author')).map(author => {
    return {
      author: author[0],
      likes: totalLikes(author[1]),
    }
  })

  return authorGrouped.reduce((lastMax, current) =>
    lastMax.likes >= current.likes
      ? lastMax
      : current, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
