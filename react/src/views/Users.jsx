import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

const Users = () => {
  //users: state, varaible
  //setUsers: func qui change le state
  //[]: valeur par defaut du state
  const [users, setUsers] = useState([])
  //isLoading: state, varaible
  //setIsLoading: func qui change le state
  //false: valeur par defaut du state
  const [isLoading, setIsLoading] = useState(false)
  const {_setNotification} = useStateContext()

  useEffect(() => {
    //
    getUsers()
  }, [])

  //READ
  const getUsers = () => {
    setIsLoading(true)
     {/* ...api/users | method get */}
    axiosClient.get('/users')
      .then(({ data }) => {
        setIsLoading(false)
        setUsers(data.data)
        //console.log(users)
      })
      .catch((error) => {
        setIsLoading(false)
        console.error(error)
      })
  }
  //DELETE
  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    {/* ...api/users/{user} | method delete */}
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        _setNotification('User was successfully deleted')
        getUsers()
      })
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Users</h1>
        {/* redirect to /users/new */}
        <Link className="btn-add" to="/users/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* si state isLoading == true */}
          {isLoading &&
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {/* si state isLoading == false */}
          {!isLoading &&
            <tbody>
              {/* users c'est le state, le type de users c'est un objet */}
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    {/* ...api/users/{user} */}
                    {/* redirect to '/users/' + u.id */}
                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;
                    {/* ...api/users/{user} */}
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}

export default Users