import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import storage from '../../Storage/storage'
import StoreContext from '../../contextos/StoreContext';

const ProtectedRoutes = ({ children }) => {
  const { authUser } = useContext(StoreContext);
  if(!authUser){
    return <Navigate to='/login' />
  }
  return <Outlet />
}

export default ProtectedRoutes