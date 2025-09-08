import React, { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

//component
const Signup = () => {
  //createRef: doit etre importe
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  //useStateContext: importe depuis mon fichier
  //{setUser, _setToken}: fonction qui vient du StateContext
  const {setUser, _setToken} = useStateContext()
  //useState: doit etre importe
  const [errors, setErrors] = useState(null)

  const onSubmit = (ev) => {
    //annule le comportement par default
    ev.preventDefault()

    //un objet que je crée
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    //axiosClient utilise la method post
    //
    //response contient: le code, headers, data
    //on selectionne que les data
    //
    //then(() => {}), si reussi
    //catch(() => {}), si erreur
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        //met à jour le context grace aux fonctions
        //pas besoin de redirect car maintenant que les infos
        //du context, du state ont changé l'app va re render
        setUser(data.user)
        _setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        //422 validation error
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
          <button className="btn btn-block">Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup