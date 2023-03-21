const dummy = (blogs) => {
  return 1;
};

const totalLikes = (listOfBlogPosts) => {
  return listOfBlogPosts.reduce((previous, current) => {
    return previous + current.likes;
  }, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
