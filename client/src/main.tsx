import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RecipeDetail from "./components/dashboard/recipes/RecipeDetail.tsx";
import MenuDetail from "./components/dashboard/menus/MenuDetail.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    // TODO figure out how to pass the url as props to RecipeDetail -> maybe with the useParams() hook?
    path: "/recipes/:id",
    element: <RecipeDetail />,
  },
  {
    path: "/menus/:id",
    element: <MenuDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
