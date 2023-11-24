import { useRoutes } from "react-router-dom";
import ModuleWrap from "../components/ModuleWrap";

import AuthLayout from "../views/layouts/AuthLayout";
import MainLayout from "../views/layouts/MainLayout";

import Login from "../views/modules/Auth/Login/Login";
import PageNotFound from "../views/errors/PageNotFound";

import Dashboard from "../views/modules/Dashboard/Dashboard";
import UserManagement from "../views/modules/UserManagement";
import RoleManagement from "../views/modules/RoleManagement";
import ResetPassword from "../views/modules/Auth/ResetPassword/ResetPassword";
import ForgotPassword from "../views/modules/Auth/ForgotPassword/ForgotPassword";
import Profile from "../views/modules/Profile";
import List from "../bhavin/UserManagement/Listing/List";
import UserManagementB from "../bhavin/UserManagement";
import Listing from "../taluka/component/Listing/Listing";
import TalukasManagement from "../taluka/component";

export default function Router() {
  return useRoutes(RouterConfig);
}

export const RouterConfig = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset/:otp",
        element: <ResetPassword />,
      },
      {
        path: "/about-us",
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ModuleWrap module={Dashboard} />,
      },
      {
        path: "/profile",
        element: <ModuleWrap module={Profile} />,
      },
      {
        path: "/users/:action?/:id?",
        element: <ModuleWrap module={UserManagement} />,
      },
      {
        path: "/roles/:action?/:id?",
        element: <ModuleWrap module={RoleManagement} />,
      },
      {
        path: "/ethnicities/:action?/:id?",
        element: <ModuleWrap module={UserManagementB} />,
      },
      {
         path : "/talukas/:action?/:id?",
         element : <ModuleWrap module={TalukasManagement} />
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
