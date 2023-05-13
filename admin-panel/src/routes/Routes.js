import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../components/common/layout/Layout";
import NonRequireAuth from "../components/pages/auth/NonRequireAuth";
import RequireAuth from "../components/pages/auth/RequireAuth";
import SignIn from "../components/pages/auth/signin/SignIn";
import AddProduct from "../components/pages/home/ProductGrid/AddProduct/AddProduct";
import UpdateProduct from "../components/pages/home/ProductGrid/UpdateProduct/UpdateProduct";
import UsersGrid from "../components/pages/home/UsersGrid/UsersGrid";
import AddUser from "../components/pages/home/UsersGrid/AddUser/AddUser";
import Panel from "../components/pages/home/Panel/Panel";
import ProductGrid from "../components/pages/home/ProductGrid/ProductGrid";
import UpdateUser from "../components/pages/home/UsersGrid/UpdateUser/UpdateUser";
import PendingOrders from "../components/pages/home/OrderGrid/States/PendingOrders";
import ProcessingOrders from "../components/pages/home/OrderGrid/States/ProcessingOrders";
import DeliveredOrders from "../components/pages/home/OrderGrid/States/DeliveredOrders";
import CanceledOrder from "../components/pages/home/OrderGrid/States/CanceledOrder";

const Routes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout children={<Outlet />} />,
      children: [{
        index: true, element: (
          <RequireAuth>
            <Panel />
          </RequireAuth>
        )
      }],
    },
    {
      path: "/products",
      element: <Layout children={<Outlet />} />,
      children: [
        { path: "", element: <RequireAuth><ProductGrid /></RequireAuth> },
        { path: "add-product", element: <RequireAuth><AddProduct /></RequireAuth> },
        { path: "update-product", element: <RequireAuth><UpdateProduct /></RequireAuth> },
      ]
    },
    {
      path: "/users",
      element: <Layout children={<Outlet />} />,
      children: [
        { path: "", element: <RequireAuth><UsersGrid /></RequireAuth> },
        { path: "add-user", element: <RequireAuth><AddUser /></RequireAuth> },
        { path: "update-user", element: <RequireAuth><UpdateUser /></RequireAuth> },
      ],
    },
    {
      path: "/orders",
      element: <Layout children={<Outlet />} />,
      children: [
        { path: "", element: <RequireAuth><PendingOrders /></RequireAuth> },
        { path: "pending", element: <RequireAuth><PendingOrders /></RequireAuth> },
        { path: "processing", element: <RequireAuth><ProcessingOrders /></RequireAuth> },
        { path: "delivered", element: <RequireAuth><DeliveredOrders /></RequireAuth> },
        { path: "canceled", element: <RequireAuth><CanceledOrder /></RequireAuth> }
      ]
    },
    {
      path: "/signin",
      element: <Layout children={<Outlet />} />,
      children: [
        {
          index: true,
          element: (
            <NonRequireAuth>
              <SignIn />
            </NonRequireAuth>
          ),
        },
      ],
    },
  ];
  return useRoutes(routes);
};

export default Routes;
