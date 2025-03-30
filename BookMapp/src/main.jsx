import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
//Css imports
import "./pages/Nav/Nav.css";
import "./pages/Login/Login.css";
import "./Site.css";
import "./pages/Create/CreateB.css";
import "./pages/View/View.css";
//Component imports
import Nav from "./pages/Nav/Nav";
import LoginPage from "./pages/Login/Login";
import BookCreater from "./pages/Create/CreateB";
import ViewBooks from "./pages/View/View";
//Provider import for global state management
import PrivateRoute from "./Route";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <BookCreater />
            </PrivateRoute>
          }
        />
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <ViewBooks />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
