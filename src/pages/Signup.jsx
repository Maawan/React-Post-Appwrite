import React, { useState } from "react";
import Input from "../components/Input";
import Logo from "../components/Logo";
import ButtonSubmit from "../components/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { disableLoading, enableLoading } from "../store/loadingSlice";
import authService from "../appwrite/AuthService";
import toast from "react-hot-toast";
import { login } from "../store/userSlice";

const Signup = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-[350px] mx-auto my-4 rounded-xl p-8 border bg-blue-100 flex justify-center flex-col items-center">
      <Logo classname={`h-16 mb-4`} />
      <Input
        placeholder={"Enter email Address"}
        className="border-blue-500 h-10 p-2 focus:outline-none active:border-0  focus:border-0 rounded-sm w-[90%] font-lumanosimo"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        placeholder={"Enter Name"}
        className="border-blue-500 mt-2 h-10 p-2 focus:outline-none active:border-0  focus:border-0 rounded-sm w-[90%] font-lumanosimo"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Input
        placeholder={"Enter your Password"}
        className={
          "my-2 rounded-sm w-[90%] p-2 h-10  focus:outline-none active:bottom-0 active:outline-none font-lumanosimo"
        }
        value={password}
        type={"password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <p className="text-red-400 texr-center"> {error} </p>
      <ButtonSubmit
        onClick={async (e) => {
          dispatch(enableLoading());
          const res = await authService.signUp({ email, password, name });
          dispatch(disableLoading());
          if (res) {
            toast.success("Account created Successfully !");
            const  res = await toast.promise(authService.login({ email, password }), {
              loading: "Logging you in",
              success: "Successfully Logged in",
              error: "Unable to login",
            });
            if(res){
                console.log("Result" , res);
                dispatch(login(res));
                localStorage.setItem("user" , JSON.stringify(res));
                naviagte("/");
            }
            
          } else {
            toast.error("Check your details and try again please");
          }
        }}
        className={
          " border bg-blue-500 hover:bg-blue-600 transition-all duration-500 h-12 w-[90%] rounded-md text-white "
        }
      >
        Signup
      </ButtonSubmit>

      <p className="text-sm mt-2">
        Already a Stack User ?{" "}
        <span
          className="text-blue-800 cursor-pointer "
          onClick={(e) => {
            naviagte("/login");
          }}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
