import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import HomePage from "../Pages/Home/HomePage";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PetListing from "../Pages/PetListing/PetListing";
import PetDetails from "../Pages/PetDetails/PetDetails";
import Dashboard from "../Layouts/DashboardLayouts/Dashboard";
import DashboardHome from "../Pages/DashoardPages/DashboardHome/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import AddPets from "../Pages/DashoardPages/AddPets/AddPets";
import MyAddedPage from "../Pages/DashoardPages/MyAddedPage/MyAddedPage";
import MyAddedPets from "../Pages/DashoardPages/MyAddedPets/MyAddedPets";
import UpdatePet from "../Pages/DashoardPages/UpdatePetInformation/UpdatePet";
import PetRequest from "../Pages/DashoardPages/PetRequest/PetRequest";
import AddDonationCamp from "../Pages/DashoardPages/AddDonationCamp/AddDonationCamp";

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
        path: "signup",
        Component: Signup,
      },
      {
        path: "pet-listing",
        Component: PetListing,
      },
      {
        path: "pet-Details/:id",
        Component: PetDetails,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "add-pet",
        element: (
          <PrivateRoute>
            <AddPets></AddPets>
          </PrivateRoute>
        ),
      },
      {
        path: "my-added-page",
        element: (
          <PrivateRoute>
            <MyAddedPage></MyAddedPage>
          </PrivateRoute>
        ),
      },
      {
        path: "my-added-pats",
        element: (
          <PrivateRoute>
            <MyAddedPets></MyAddedPets>
          </PrivateRoute>
        ),
      },
      {
        path: "update-pet-details/:id",
        element: (
          <PrivateRoute>
            <UpdatePet></UpdatePet>
          </PrivateRoute>
        ),
      },
      {
        path: "adoption-requests",
        element: (
          <PrivateRoute>
            <PetRequest></PetRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "create-campaign",
        element: (
          <PrivateRoute>
            <AddDonationCamp></AddDonationCamp>
          </PrivateRoute>
        ),
      },
    ],
  },
]);