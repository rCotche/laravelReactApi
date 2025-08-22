import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

//<Outlet /> : l'endroit où les routes enfants
//seront appelés
//tous ce qu'on va mettre ici seront aussi affiché sur les pages children
//tuto 30:40
const GuestLayout = () => {
  const { token } = useStateContext()

  //si le token exist (donc authenticated)
  if (token) {
    //redirect vers la page users
    return <Navigate to="/" />
  }
  return (
    <div>
      guest
        <Outlet />
    </div>
  )
}

export default GuestLayout