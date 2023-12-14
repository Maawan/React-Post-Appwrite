import React from 'react'
import { useSelector } from 'react-redux'

const AuthLayout = ({children}) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  return (
    <div>
        
        {
            useSelector(state => state.user.isLoggedIn) ? (<div>{children}</div>) : (
                
                <div className='flex w-full h-[500px] justify-center items-center'>

                    <p className='text-xl font-lumanosimo text-blue-500'>You need to login first</p>
                </div>
            )
        }



    </div>
        
    
  )
}

export default AuthLayout