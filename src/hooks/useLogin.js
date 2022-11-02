import React from 'react'
import {useState} from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

export const useLogin = () => {

    const[error, setError] = useState(null)
    const[isPending, setIsPending] = useState(false)
    const {state, dispatch} = useAuthContext()
    const navigate = useNavigate()

    const login = async (email, password)=> {
       
        setError(null)
        setIsPending(true)

        try {

            const userCredential = await signInWithEmailAndPassword(projectAuth, email, password)
            const user = userCredential.user
            dispatch({type: 'LOGIN', payload: user})
            toast.success(`Welcome back ${user.displayName}`)
            navigate('/finance')
            setIsPending(false)
           setError(null)
            
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
            setError(error.message)
            setIsPending(false)
        }
    }

    return {login, error, isPending}
}

