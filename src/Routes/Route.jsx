import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import HomePage from "../Pages/Home/HomePage";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path : 'signup',
        Component : Signup
      }
    ],
  },
]);