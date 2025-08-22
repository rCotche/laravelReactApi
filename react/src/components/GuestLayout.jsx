import React from 'react'
import { Outlet } from 'react-router-dom'

//<Outlet /> : l'endroit où les routes enfants
//seront appelés
//tous ce qu'on va mettre ici seront aussi affiché sur les pages children
//tuto 30:40
const GuestLayout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default GuestLayout