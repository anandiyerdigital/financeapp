import React from 'react'
import {Navigate} from 'react-router-dom'

import { useAuthContext } from '../hooks/useAuthContext'
import {toast} from 'react-toastify'

export const ProtectedRoute = ({children}) => {

  const {user} = useAuthContext()  

  if(!user) {
    toast.error("Please login")
    return <Navigate to="/" />
  }

  return children
  
}
