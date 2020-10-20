const { validateLogin } = require("../middlewares/Auth");


const Login = async (req, res) => {
  await validateLogin(req.body, res);
};

module.exports = {
  Login,
};
