import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Gate from "./components/login/Gate.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import RecipeDetail from "./components/dashboard/recipes/RecipeDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />,
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
    // TODO figure out how to pass the url as props to RecipeDetail -> maybe with the useParams() hook?
    path: "/recipes/:id",
    element: <RecipeDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
