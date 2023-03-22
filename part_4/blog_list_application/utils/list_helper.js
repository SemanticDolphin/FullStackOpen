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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
