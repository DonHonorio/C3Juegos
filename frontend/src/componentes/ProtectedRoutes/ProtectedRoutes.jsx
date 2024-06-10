import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import storage from '../../Storage/storage'
import StoreContext from '../../contextos/StoreContext';

const ProtectedRoutes = ({ children }) => {
  if(!storage.get('authUser')){
    return <Navigate to='/login' />
  }
  return <Outlet />
}

export default ProtectedRoutes