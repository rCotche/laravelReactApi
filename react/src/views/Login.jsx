import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

const Login = () => {

  const emailRef = createRef()
  const passwordRef = createRef()

  const [message, setMessage] = useState(null)
  //useStateContext: importe depuis mon fichier
  //{setUser, _setToken}: fonction qui vient du StateContext
  const { setUser, _setToken } = useStateContext()

  const onSubmit = (ev) => {
    ev.preventDefault()

    //un objet que je crée
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    //axiosClient utilise la method post
    //
    //response contient: le code, headers, data
    //on selectionne que les data
    //
    //then(() => {}), si reussi
    //catch(() => {}), si erreur
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        _setToken(data.token);
      })
      .catch((err) => {
        const res = err.response;
        if (res?.status === 422) {
          console.error(res);
          const apiMessage = res.data?.message || {};

          setMessage(apiMessage);
          return; // on a géré
        }
        // autres erreurs (réseau, 500, etc.)
        console.error(err);
      })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>

          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }

          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login;