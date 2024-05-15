import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState(null);
  const checkLogin = async (data) => {
    try {
      console.log(data);
      const loginUser = await axios.post("/api/users/login", {
        ...data,
      });
      console.log(loginUser);
      if (loginUser.data.status === 300) {
        setLoginError(loginUser.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit(checkLogin)} className="flex flex-col gap-4">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="bg-slate-100 p-3 rounded-lg"
          {...register("email", { required: true })}
        ></input>
        <label>password</label>
        <input
          type="password"
          className="bg-slate-100 p-3 rounded-lg"
          {...register("password", { required: true })}
        ></input>
        <button type="submit" className="rounded-md border-black border-2 ">
          Click me to Sign In
        </button>
      </form>
      {
        loginError && <span className="text-red-600">{loginError}</span>
      }
      <div className="flex gap-2 mt-5">
        <p>Don't have an Account ?</p>
        <Link to="/sign-up" className="text-blue-600">
          Click to Register
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
