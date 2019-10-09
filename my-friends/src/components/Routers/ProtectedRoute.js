import React from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = Component => props => {
  if (localStorage.getItem("token")) {
    return <Component {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default ProtectedRoute;
