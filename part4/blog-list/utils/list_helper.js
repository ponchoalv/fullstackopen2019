const dummy = blogs => {
  return 1
}

const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})

const maxBy = (xs, key) =>
  xs.reduce((lastMax, currentValue) =>
    lastMax[key] >= currentValue[key]
      ? lastMax
      : currentValue, {})

const totalLikes = blogs =>
  blogs.reduce((previous, current) => previous + current.likes, 0)

const favoriteBlog = blogs =>
  maxBy(blogs, 'likes')

const mostBlogs = blogs => {
  const authorGrouped = Object.entries(groupBy(blogs, 'author')).map(author => {
    return {
      author: author[0],
      blogs: author[1].length,
    }
  })

  return maxBy(authorGrouped,'blogs')
}

const mostLikes = blogs => {
  const authorGrouped = Object.entries(groupBy(blogs, 'author')).map(author => {
    return {
      author: author[0],
      likes: totalLikes(author[1]),
    }
  })

  return favoriteBlog(authorGrouped)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
