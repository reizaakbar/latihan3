import React from "react";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Toastify from "toastify-js";
import Login from "../views/Login";
import BaseLayout from "../views/BaseLayout";
import HomePage from "../views/HomePage";
import Favorite from "../views/Favorite"
import Update from "../views/Update";

const url = "http://localhost:3000"; 

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        Toastify({
          text: "You're already logged in",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {},
        }).showToast();
        return redirect("/"); 
      }
      return null;
    },
 
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        Toastify({
          text: "Please login first",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {},
        }).showToast();
        return redirect("/login"); 
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage url={url} />,
      },
      {
        path: "/favorite",
        element: <Favorite url={url} />,
      },
      {
        path: "/update/:id",
        element: <Update url={url} />,
      },
    ],
  },
]);

export default router;