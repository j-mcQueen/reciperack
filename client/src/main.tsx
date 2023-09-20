import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Gate from "./components/login/Gate.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import RecipeDetail from "./components/dashboard/recipes/RecipeDetail.tsx";
import Error from "./components/Error.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/gate",
    element: <Gate />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/recipes/:id",
    element: <RecipeDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
