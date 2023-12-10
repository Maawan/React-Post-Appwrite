import React, { useId } from 'react'

const Input = ({ type , className,placeholder , ...props} , ref) => {
    const id = useId();
  return (
    <input type={type} className={`${className}`} placeholder={placeholder}  {...props}
        ref={ref}
        id={id}
    />
  )
}

export default React.forwardRef(Input);