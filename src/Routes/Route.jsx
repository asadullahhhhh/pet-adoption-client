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
import MyCampain from "../Pages/DashoardPages/MyCampain/MyCampain";
import EditCampain from "../Pages/DashoardPages/EditCampain/EditCampain";
import DonationCampaign from "../Pages/DonationCampaing/DonationCampaign";
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import MyDonation from "../Pages/DashoardPages/Mydonations/MyDonation";
import AdminRoute from "./AdminRoute";
import AllUsers from "../Pages/DashoardPages/AllUsersDashboard/AllUsers";
import AllPetsPage from "../Pages/DashoardPages/AllPetsPage/AllPetsPage";
import AllDonations from "../Pages/DashoardPages/AllDonations/AllDonations";
import ForbiddenPage from "../Pages/ForbiddenPage/ForbiddenPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

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
      {
        path: "donation-campaign",
        Component: DonationCampaign,
      },
      {
        path: "donation-details/:id",
        Component: DonationDetails,
      },
    ],
  },
  {
    path : 'forbidden',
    Component : ForbiddenPage
  },
  {
    path : '*',
    Component : ErrorPage
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
      {
        path: "my-campaigns",
        element: (
          <PrivateRoute>
            <MyCampain></MyCampain>
          </PrivateRoute>
        ),
      },
      {
        path: "edit-campaign/:id",
        element: (
          <PrivateRoute>
            <EditCampain></EditCampain>
          </PrivateRoute>
        ),
      },
      {
        path: "my-donations",
        element: (
          <PrivateRoute>
            <MyDonation></MyDonation>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-pets",
        element: (
          <AdminRoute>
            <AllPetsPage></AllPetsPage>
          </AdminRoute>
        ),
      },
      {
        path: "all-donations",
        element : (
          <AdminRoute>
            <AllDonations></AllDonations>
          </AdminRoute>
        )
      },
    ],
  },
]);