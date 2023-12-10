import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/AuthService";
import { logout } from "../store/userSlice";
import { disableLoading, enableLoading } from "../store/loadingSlice";
import toast from "react-hot-toast";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  async function handleLogout() {
    console.log("Process started ");
      dispatch(enableLoading());
      const res = await authService.logout();
      if (res) {
        localStorage.setItem("user", JSON.stringify(undefined));
        console.log("Logout complete ", res);
        dispatch(logout());
        toast.success("You are successfully logged out :)");
      } else {
        toast.error("Oops ! Unable to log you out");
      }
      dispatch(disableLoading());
    

    navigate("/");
  }

  return <div>Logout</div>;
};

export default Logout;
