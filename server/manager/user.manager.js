const userModel = require("../models/user.model");
var bcrypt = require("bcryptjs");
const { Success, Error, success,error } = require('../util/response.util');
const registerUser = async (body) => {
  try {
    console.log(body)
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(body?.password, salt);
    // check for duplicate email,mobile no, userName
    const emailExist = await userModel.exists({ email: body?.email });
    const userName = await userModel.exists({ userName: body?.userName });
    if (emailExist) {
      return success({ message: "email already exist" ,code:501 });
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
            password:hashPassword,
        }).save()
        return success({ message: "Registration successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};
const loginUser = async(body) =>{
  try {
   const isUserExist = await userModel.findOne({ email: body?.email });
   
   if(!isUserExist) {
    return success({message:"No Account Found from this email",status:300})
   }
   else{
    const validUser = bcrypt.compareSync(body.password,isUserExist.password);
    console.log(validUser)
    if(!validUser) {
      return success({message:"Please check you email or password",status:300})
    }
    else {
      
    }
   }
    
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  registerUser,
  loginUser
};