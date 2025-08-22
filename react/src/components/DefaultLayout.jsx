import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

const DefaultLayout = () => {
  const { user, token } = useStateContext()

  //si le token exist pas (donc pas authenticated)
  if (!token) {
    //redirect vers la page de login
    return <Navigate to="/login" />
  }
  return (
    <div>
      default
      <Outlet />
    </div>
  )
}

export default DefaultLayout