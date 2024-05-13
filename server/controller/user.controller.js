const userManager = require("../manager/user.manager");
const registerUser = async (request, response) => {
  userManager
    .registerUser(request.body)
    .then((result) => response.status(result.code).send(result.data))
    .catch((error) => response.status(500).send(error.message));
};
module.exports = { registerUser };