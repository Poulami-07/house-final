import { Navigate, Outlet } from "react-router-dom";

import React from 'react'
import useAuthState from "../hooks/useAuthState";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const {loggedIN, checkState} = useAuthState()

  if(checkState) {
    return <Spinner />
  }

  return loggedIN ? <Outlet /> : <Navigate to= "/signin" />
}

export default PrivateRoute