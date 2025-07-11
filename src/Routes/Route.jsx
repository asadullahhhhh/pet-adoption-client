import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import HomePage from "../Pages/Home/HomePage";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PetListing from "../Pages/PetListing/PetListing";
import PetDetails from "../Pages/PetDetails/PetDetails";
import Dashboard from "../Layouts/DashboardLayouts/Dashboard";
import DashboardHome from "../DashoardPages/DashboardHome/DashboardHome";

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
      },
      {
        path : 'pet-listing',
        Component : PetListing
      },
      {
        path : 'pet-Details/:id',
        Component : PetDetails
      }
    ],
  },
  {
    path : 'dashboard',
    Component : Dashboard,
    children : [
      {
        index : true,
        Component : DashboardHome
      }
    ]
  }
]);