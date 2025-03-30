import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
//Css imports
import "./Nav/Nav.css";
import "./Login/Login.css";
import "./Site.css";
import "./Create/CreateB.css";
import "./View/View.css";
//Component imports
import Nav from "./Nav/Nav";
import LoginPage from "./Login/Login";
import BookCreater from "./Create/CreateB";
import ViewBooks from "./View/View";
//Provider import for global state management
import { Provider } from "./Provider";
import PrivateRoute from "./Route";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
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
    </Provider>
  </StrictMode>
);
