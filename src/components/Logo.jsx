import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const Logo = ({classname, ...props}) => {
    const navigate = useNavigate();
  return (
    <img src="../src/assets/logo.png" className={`cursor-pointer ${classname}`} alt="" {...props} onClick={(e) => {
        navigate("/");
        console.log("Clicked");
    }}/>
  )
}

export default Logo