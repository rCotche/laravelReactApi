import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

const UserForm = () => {
    //user: state, variable
    //setUser: fonction pour changer, modifier, interagir le state
    //{object}: valeur par defaut de user
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    //
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    //_setNotification: fonction du contexte
    const { _setNotification } = useStateContext()
    //doit etre importe
    //useParams est un hook de React Router (via react-router-dom)
    // qui te permet de récupérer les paramètres dynamiques de l’URL
    //  — ceux que tu définis dans le chemin de la route avec des :.
    let {id} = useParams();
    //doit etre importe
    const navigate = useNavigate();  

    if (id) {
        //doit etre importe
        //appelé une fois
        useEffect(() => {
            setLoading(true)
            //...api/users/{user} | method get
            //{ data } est une valeur que je ne peux pas changé le nom, un objet
            //data.data est aussi un objet avec les valeurs de l'utilisateur
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    console.log(data)
                    setUser(data.data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }
    //UPDATE
    const updateUser = () => {
        //...api/users/{user} | method put
        axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
                _setNotification('User was successfully updated')
                //doit etre importe
                navigate('/users')
            })
            .catch(err => {
                const response = err.response;
                console.error(err)
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }
    //CREATE
    const createUser = () => {
        //...api/users | method post
        axiosClient.post('/users', user)
            .then(() => {
                _setNotification('User was successfully created')
                //
                navigate('/users')
            })
            .catch(err => {
                const response = err.response;
                console.error(err)
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }
    const onSubmit = ev => {
        ev.preventDefault()
        if (user.id) {
            updateUser()
        } else {
            createUser()
        }
    }
    return (
        <div>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder="Name" />
                        <input value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder="Email" />
                        <input type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Password" />
                        <input type="password" onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder="Password Confirmation" />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default UserForm