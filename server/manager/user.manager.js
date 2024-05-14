const userModel = require("../models/user.model");
var bcrypt = require("bcryptjs");
const { Success, Error, success,error } = require('../util/response.util');
const registerUser = async (body) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(body?.password, salt);
    // check for duplicate email,mobile no, userName
    const emailExist = await userModel.exists({ email: body?.email });
    const mobileExist = await userModel.exists({ mobileno: body?.mobileno });
    const userName = await userModel.exists({ userName: body?.userName });
    if (emailExist) {
      return success({ message: "email already exist" ,code:501 });
    }
    else if (mobileExist) {

      return error({ message: "mobile no already exist" });
    }
    else if (userName) {
      return Error({ message: "user Name already exist" });
    }
    else {
        await userModel({
            firstName:body?.firstName,
            lastName:body?.lastName,
            userName:body?.userName,
            email:body?.email,
            mobileno:body?.mobileno,
            password:hashPassword,
            dateofbirth:body?.dateofbirth,
        }).save()
        return success({ message: "Registration successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerUser,
};