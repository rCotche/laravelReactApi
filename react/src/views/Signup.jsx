import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from "../axios-client.js";
import axios from "axios";

//component
const Signup = () => {
  //createRef: doit etre importe
  //permet d’obtenir une référence directe à un élément DOM (comme un <input>)
  // ou à une instance de composant React dans un composant de classe.
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  //useStateContext: importe depuis mon fichier
  //{setUser, _setToken}: fonction qui vient du StateContext
  const { setUser, _setToken } = useStateContext()
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
      .then(({ data }) => {
        //met à jour le context grace aux fonctions
        //pas besoin de redirect car maintenant que les infos
        //du context, du state ont changé l'app va re render
        setUser(data.user)
        _setToken(data.token);
      })
      .catch(err => {
        // Cas 1 : vraie réponse HTTP (422 validation)
        if (axios.isAxiosError(err) && err.response) {
          const { status, data } = err.response;
          if (status === 422 && data?.errors) {
            // Laravel renvoie { message: "...", errors: { field: [ "msg" ] } }
            setErrors(data.errors);
            return;
          }
          // Autres statuts (400/401/403/404/500...) -> affiche un message générique
          setErrors({ _general: [data?.message || "Une erreur est survenue."] });
          return;
        }

        // Cas 2 : AUCUNE réponse (réseau/CORS/timeout/URL) 
        setErrors({ _general: ["Impossible de joindre l’API (réseau/CORS)."] });
        console.error('Network/no-response:', err.code, err.message);
      })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          {errors &&
            <div className="alert">
              {/* errors: est un objet*/}
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password" />
          <button className="btn btn-block">Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup