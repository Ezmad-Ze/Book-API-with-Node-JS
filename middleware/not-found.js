const notFound = (req, res) =>
  res.status(404).json({ Message: `Route doesn't exist` });

module.exports = notFound;
