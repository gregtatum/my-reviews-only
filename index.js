const { runPhabricatorReviews } = require('./phab');
const { runGithubReviews } = require('./github');

module.exports = {
  runPhabricatorReviews,
  runGithubReviews,
};
