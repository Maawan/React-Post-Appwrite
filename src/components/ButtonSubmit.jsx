import React from 'react'

const ButtonSubmit = ({children , className , ...props} , ref) => {
  return ( 
    <button
        className={className} {...props} 
    >{children}</button>
  )
}

export default React.forwardRef(ButtonSubmit);