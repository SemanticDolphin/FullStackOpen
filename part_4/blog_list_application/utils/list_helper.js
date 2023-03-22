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
      return blogCounts[current] > blogCounts[previous] ? current : previous;
    }
  );

  return {
    author: mostBloggedAuthor,
    blogs: blogCounts[mostBloggedAuthor],
  };
};

const mostLikes = (listOfBlogPosts) => {
  if (listOfBlogPosts.length === 0) {
    return null;
  }
  const likeCounts = listOfBlogPosts.reduce((previous, { author, likes }) => {
    previous[author] = (previous[author] || 0) + likes;
    return previous;
  }, {});

  const mostLikedAuthor = Object.keys(likeCounts).reduce(
    (previous, current) => {
      return likeCounts[current] > likeCounts[previous] ? current : previous;
    }
  );
  return {
    author: mostLikedAuthor,
    likes: likeCounts[mostLikedAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
