import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import Button from './Button'
import authService from '../appwrite/AuthService';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { enableLoading } from '../store/loadingSlice';
import toast from 'react-hot-toast';
const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navItems = [
        {
            name : "Home",
            isActive : useSelector(state => state.user.isLoggedIn),
            navigate : "/"
        },
        {
            name : "All Posts",
            isActive : useSelector(state => state.user.isLoggedIn),
            navigate : "/allposts"
        },
        {
            name : "Add Posts",
            isActive : useSelector(state => state.user.isLoggedIn),
            navigate : "/add-post"
        },
        {
            name : "Signin",
            isActive : !useSelector(state => state.user.isLoggedIn),
            navigate : "/login"
        },
        {
            name : "Signup",
            isActive : !useSelector(state => state.user.isLoggedIn),
            navigate : "/signup"
        },
        {
            name : "Logout",
            isActive : useSelector(state => state.user.isLoggedIn),
            navigate : "/logout"
        }
    ]
  return (
    <nav className='flex h-16 border items-center justify-around'>
        <Logo className="flex h-[80%]"/>
        <ul className='flex'>
            {
                navItems.map((item) => (
                    item.isActive && (<Button className='mx-2 text-white text-md bg-blue-500
                    hover:bg-blue-700' onClick={ async(e) => {
                        navigate(item.navigate);
                    }} key={item.name} name={item.name}/>)
                ))
            }
        </ul>
    </nav>
  )
}

export default Header;