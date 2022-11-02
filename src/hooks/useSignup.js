import React from 'react'
import {useState} from 'react'
import { projectAuth } from '../firebase/config'
import {toast} from 'react-toastify'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { useAuthContext } from './useAuthContext'
import {useNavigate} from 'react-router-dom'
const useSignup = () => {

const [error, setError] = useState(null)
const [isPending, setIsPending] = useState(false)
const {dispatch} = useAuthContext()
const navigate = useNavigate()

const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)
    try {

        const userCredential = await createUserWithEmailAndPassword(projectAuth, email, password)
        // if(!userCredential.currentUser){
            
        //     toast.error('Cannot create a new user')
        //     throw Error('Could not create an account')
            
        // }
        console.log(userCredential)
        const user = userCredential.user
        console.log(user)
        
            toast.success("Thank you for signing up")
      
        
        
        updateProfile(user, {displayName})
        

        //dispatch login action

        dispatch({type: 'LOGIN', payload: user})
        

        setIsPending(false)
        setError(null)
        navigate('/')
        
    } catch (error) {
        toast.error(error.message)
        setError(error.message)
        setIsPending(false)
    }



}

  return (
    {
        error, isPending, signup
    }
  )
}

export default useSignup