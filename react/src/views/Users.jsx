import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'

const Users = () => {
  //users: state, varaible
  //setUsers: func qui change le state
  //[]: valeur par defaut du state
  const [users, setUsers] = useState([])
  //isLoading: state, varaible
  //setIsLoading: func qui change le state
  //false: valeur par defaut du state
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    getUsers()
  }, [])

  const getUsers = () => {
    setIsLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setIsLoading(false)
        console.log(data)
        //setUsers(data.data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.error(error)
      })
  }
  return (
    <div>Users</div>
  )
}

export default Users