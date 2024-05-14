import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState: { errors },
  } = useForm();
  const [value, onChange] = useState(new Date());
  const registeruser = async (data) => {
    console.log(data);
  };
  const checkPassword = (confirmPassword) => {
    console.log("dklj", watch("password"), confirmPassword);
    if (watch("password").toLowerCase() != confirmPassword.toLowerCase()) {
      setError("confirmPassword", {
        message: "Password doesnot match",
      });
    } else {
      setError("confirmPassword", {
        message: "",
      });
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form
        onSubmit={handleSubmit(registeruser)}
        className="flex flex-col gap-4"
      >
        <input
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="firstName"
          type="text"
          {...register("firstName", {
            required: "First Name is Required",
          })}
        />
        {errors.firstName && (
          <span className="text-red-600">{errors.firstName.message}</span>
        )}
        <input
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="last Name"
          type="text"
          {...register("lastName", {
            required: "Last Name is Required",
          })}
        />
        {errors.lastName && (
          <span className="text-red-600">{errors.lastName.message}</span>
        )}
        <input
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
          type="text"
          {...register("email", {
            required: "Email is Required",
          })}
        />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
        <input
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="userName"
          type="text"
          {...register("userName", {
            required: "userName is Required",
          })}
        />
        {errors.userName && (
          <span className="text-red-600">{errors.userName.message}</span>
        )}
        <input
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="password"
          type="password"
          {...register("password", {
            required: "password is Required",
          })}
        />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
        <input
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="confirm Password"
          type="password"
          {...register("confirmPassword", {})}
          onChange={(e) => {
            checkPassword(e.target.value);
          }}
        />
        {errors.confirmPassword && (
          <span className="text-red-600">{errors.confirmPassword.message}</span>
        )}
        <button type="submit" className="rounded-md border-black border-2 ">
          Click me to Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account ?</p>
        <Link to="/sign-in" className="text-blue-600">Click to login</Link>
      </div>
    </div>
  );
};

export default SignUp;
