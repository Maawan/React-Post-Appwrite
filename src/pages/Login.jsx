import React, { useState } from 'react'
import Input from '../components/Input'
import Logo from '../components/Logo';
import ButtonSubmit from '../components/ButtonSubmit';
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/AuthService';
import { useDispatch } from 'react-redux';
import { disableLoading, enableLoading } from '../store/loadingSlice';
import toast from 'react-hot-toast';
import { login } from '../store/userSlice';

const Login = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [error , setError] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  return (
    <div className='w-[350px] mx-auto my-4 rounded-xl p-8 border bg-blue-100 flex justify-center flex-col items-center'>
      <Logo  classname={`h-16 mb-4`}/>
        <Input 
            placeholder={"Enter email Address"}
            className="border-blue-500 h-10 p-2 focus:outline-none active:border-0  focus:border-0 rounded-sm w-[90%] "
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
        />
        <Input 
            placeholder={"Enter your Password"}
            className={"mt-2 rounded-sm w-[90%] p-2 h-10  focus:outline-none active:bottom-0 active:outline-none"}
            value={password}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p className='cursor-pointer text-[14px] w-[90%] text-right mr-2 text-blue-800'
          onClick={(e) => {
            naviagte("/forgot-password")
          }}
          >Forgot Password</p>
          <p className='text-red-400 texr-center'> {error} </p>
          <ButtonSubmit 
            onClick={async (e) => {
                dispatch(enableLoading());
                const res = await authService.login({email , password});
                dispatch(disableLoading());
                
                if(res){
                    toast.success("You are logged-in now. Enjoy :)");
                    naviagte("/");
                    console.log("User Details : " , res);
                    dispatch(login(res));
                    localStorage.setItem("user" , JSON.stringify(res));
                }else{
                    toast.error("Your credentials doesn't match with our records");

                }
            }}
          
          className={"border bg-blue-500 hover:bg-blue-600 transition-all duration-500 h-12 w-[90%] rounded-md text-white "}>Login</ButtonSubmit>

          <p className='text-sm mt-2'>Are you new to Stack ? <span className='text-blue-800 cursor-pointer '
          onClick={(e) => {
            naviagte("/register")
          }}>Register</span></p>
          

    </div>
  )
}

export default Login