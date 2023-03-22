const dummy = (blogs) => {
  return 1;
};

const totalLikes = (listOfBlogPosts) => {
  return listOfBlogPosts.reduce((previous, current) => {
    return previous + current.likes;
  }, 0);
};

const favoriteBlog = (listOfBlogPosts) => {
  if (listOfBlogPosts.length === 0) {
    return null;
  }
  const favorite = listOfBlogPosts.reduce((previous, current) => {
    return current.likes > previous.likes ? current : previous;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (listOfBlogPosts) => {
  if (listOfBlogPosts.length === 0) {
    return null;
  }

  const blogCounts = listOfBlogPosts.reduce((previous, { author }) => {
    previous[author] = (previous[author] || 0) + 1;
    return previous;
  }, {});

  const mostBloggedAuthor = Object.keys(blogCounts).reduce(
    (previous, current) => {
      return blogCounts[previous] > blogCounts[current] ? previous : current;
    }
  );

  return {
    author: mostBloggedAuthor,
    blogs: blogCounts[mostBloggedAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
