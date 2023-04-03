const { validationResult } = require("express-validator");

module.exports = {
  //handle errors in various areas of the app
  handleErrors(templateFunc) {
    return (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send(templateFunc({ errors }));
      }

      next();
    };
  },
  //make sure user has been authenticated
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/signin");
    }
    next();
  },
};
