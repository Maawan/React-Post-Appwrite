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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path : "/login",
        element: <Login />
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
        element : <AddPost />
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
