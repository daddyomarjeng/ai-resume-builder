import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/home/Page";
import HomeErrorPage from "./pages/home/Error";
import ResumeErrorPage from "./pages/resume/Error";
import ResumePage from "./pages/resume/Page";
import AppContextProvider from "../context/AppContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <HomeErrorPage />,
  },
  {
    path: "/resume",
    element: <ResumePage />,
    errorElement: <ResumeErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
