import { Outlet, useParams, useRoutes } from "react-router-dom";
import Layout from "../components/common/layout/Layout";
import NonRequireAuth from "../components/pages/auth/NonRequireAuth";
import RequireAuth from "../components/pages/auth/RequireAuth";
import SignIn from "../components/pages/auth/signin/SignIn";
import SignUp from "../components/pages/auth/signup/SignUp";
import Home from "../components/pages/home/Home";
import AddProduct from "../components/pages/home/ProductGrid/AddProduct/AddProduct";
import UpdateProduct from "../components/pages/home/ProductGrid/UpdateProduct/UpdateProduct";
import UsersGrid from "../components/pages/home/UsersGrid/UsersGrid";
import AddUser from "../components/pages/home/UsersGrid/AddUser/AddUser";
import Panel from "../components/pages/home/Panel/Panel";
import ProductGrid from "../components/pages/home/ProductGrid/ProductGrid";
import UpdateUser from "../components/pages/home/UsersGrid/UpdateUser/UpdateUser";

const Routes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout children={<Outlet />} />,
      children: [{
        index: true, element: (
          // <RequireAuth>
          <Home />
          // <Panel children={<Home />}/>
          // </RequireAuth>
        )
      }],
    },
    {
      path: "/products",
      element: <Layout children={<Outlet />} />,
      children: [{
        index: true, element: (
          // <RequireAuth>
          // <Panel children={<ProductGrid/>}/>
          <ProductGrid/>
          // <Panel/>
          // </RequireAuth>
        )
      }],
    },
    {
      path: "/add-product",
      element: <Layout children={<Outlet />} />,
      children: [{
        index: true, element: (
          // <RequireAuth>
          <AddProduct />
          // </RequireAuth>
        )
      }],
    },
    {
      path: "/update-product/",
      exact:true,
      element: <Layout children={<Outlet />} />,
      children: [{
        index: true, element: (
          // <RequireAuth>
          <UpdateProduct />
          // </RequireAuth>
        )
      }],
    },
    {
      path: "/users",
      element: <Layout children={<Outlet />} />,
      children: [
        {
          index: true,
          element: (
            // <RequireAuth>
            <UsersGrid />
            // </RequireAuth>
          ),
        },
      ],
    },
    {
      path: "/add-user",
      element: <Layout children={<Outlet />} />,
      children: [{
        index: true, element: (
          // <RequireAuth>
          <AddUser />
          // </RequireAuth>
        )
      }],
    },
    {
      path: "/update-user",
      element: <Layout children={<Outlet />} />,
      children: [{
        index: true, element: (
          // <RequireAuth>
          <UpdateUser />
          // </RequireAuth>
        )
      }],
    },
    {
      path: "/orders",
      element: <Layout children={<Outlet />} />,
      children: [
        {
          index: true,
          element: (
            // <RequireAuth>
            <Panel children={<UsersGrid />}/>
            // </RequireAuth>
          ),
        },
      ],
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
    {
      path: "/signup",
      element: <Layout children={<Outlet />} />,
      children: [
        {
          index: true,
          element: (
            <NonRequireAuth>
              <SignUp />
            </NonRequireAuth>
          ),
        },
      ],
    },
    //   {
    //     path: "/cart",
    //     element: <Layout children={<Outlet />} />,
    //     children: [{ index: true, element: <Cart /> }],
    //   },
    //   {
    //     path: "/checkout",
    //     element: <Layout children={<Outlet />} />,
    //     children: [
    //       {
    //         index: true,
    //         element: (
    //           <RequireAuth>
    //             <Checkout />
    //           </RequireAuth>
    //         ),
    //       },
    //     ],
    //   },
    //   {
    //     path: "/account",
    //     element: <Layout children={<Outlet />} />,
    //     children: [
    //       {
    //         index: true,
    //         element: (
    //           <RequireAuth>
    //             <Account />
    //           </RequireAuth>
    //         ),
    //       },
    //     ],
    //   },
  ];
  return useRoutes(routes);
};

export default Routes;
