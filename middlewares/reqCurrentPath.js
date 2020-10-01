module.exports = function exposeUrlPath(req, res, next) {
    res.locals.currentPath = req.path;
    next();
  };