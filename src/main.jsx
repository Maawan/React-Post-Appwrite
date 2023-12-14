import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Loading from "./components/Loading.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { Toaster } from "react-hot-toast";
import Logout from "./pages/Logout.jsx";
import AddPost from "./pages/AddPost.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Post from "./pages/Post.jsx";
import Invalid from "./pages/Invalid.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: 
        <AuthLayout >
          <Home />
        </AuthLayout>
      },
      {
        path : "/login",
        element: 
        <Login />
      },
      {
        path : "/logout",
        element : <Logout />
      },
      {
        path : "/signup",
        element : <Signup />
      },
      {
        path : "/add-post",
        element : 
        <AuthLayout >
          <AddPost />
        </AuthLayout>
      },
      {
        path : "/post/:id",
        element: 
        <AuthLayout>
          <Post />
        </AuthLayout>
        
      },{
        path : "/404",
        element:
        <Invalid />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(

  <Provider store={store}>
    <Toaster />
    <RouterProvider router={router} />
    <Loading />
  </Provider>
);
