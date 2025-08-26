import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

const DefaultLayout = () => {
  const { user, token } = useStateContext()

  //si le token exist pas (donc pas authenticated)
  if (!token) {
    //redirect vers la page de login
    return <Navigate to="/login" />
  }

  const onLogout = ev => {

    //ev: (abréviation de event) est l'objet événement
    //passé automatiquement à la fonction lorsque l’événement (click) se produit
    //preventDefault: est une méthode qui annule le comportement par défaut
    // de l’événement (redirection, comportement d'un lien)
    ev.preventDefault()

    /*
    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
    */
  }
  return (
    <div id="defaultLayout">
      <aside>
        {/*
        *** Link : balise de React routeur dom, il doit etre importé
        */}
        <Link to="/dashboard">dashboard</Link>
        <Link to="/users">users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout