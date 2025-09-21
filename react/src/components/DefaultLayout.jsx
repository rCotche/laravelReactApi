import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'

const DefaultLayout = () => {
  const { user, token, notification, setUser, _setToken } = useStateContext()

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

    
    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        _setToken(null)
      })
    
  }

  //doit etre importé
  //[]: dependance vide, donc appelé une fois, lors du premier chargement
  //quand on fetch de la data, recupere de la data

  //pas necessaire car dans le login on utilise déjà setuser du context provider, doublon
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

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
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}

export default DefaultLayout