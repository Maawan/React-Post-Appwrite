import React from "react";

const Button = ({ name, className, ...props }, ref) => {
  return (
    <p
      class="group cursor-pointer text-gray-900 mx-4 transition-all duration-300 ease-in-out  hover:font-semibold hover:text-blue-500"
      href="#"
      ref={ref}
      {...props}
    >
      <span class="bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:0%_20px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
        {name}
      </span>
    </p>
  );
};

export default React.forwardRef(Button);
