/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "./views/Admin/Dashboard/Dashboard.js";
import GymProfile from "./views/Admin/GymProfile/GymProfile.js";
import Maps from "./views/Admin/Maps/Maps.js";
import NotificationsPage from "./views/Admin/Notifications/Notifications.js";
import GymTableList from "./views/Admin/GymTableList/GymTableList.js";
import GymOwnerDashboard from './views/GymOwner/GymOwnerDashboard.js'
import UserTableList from './views/GymOwner/UserTableList'
// core components/views for RTL layout

export const AdmindashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user/:gym_email",
    name: "Gym Profile",
    hidden: true,
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: GymProfile,
    layout: "/admin"
  },
  {
    path: "/gymList",
    name: "Gym List",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "content_paste",
    component: GymTableList,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  }
];
  export const GymOwnerdashboardRoutes = [
  {
    path: "/register_gym",
    name: "Gym Owner Dashboard",
    rtlName: "إخطارات",
    icon: Dashboard,
    component: GymOwnerDashboard,
    layout: "/owner"
  },
  {
    path: "/userList",
    name: "User List",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "content_paste",
    component: UserTableList,
    layout: "/owner"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/owner"
  },
];