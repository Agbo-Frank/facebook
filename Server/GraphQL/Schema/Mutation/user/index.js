const auth = require("./auth");
const editUser = require("./editUser");
const others = require("./others");


module.exports = {
    ...editUser,
    ...auth,
    ...others
}