import {useState} from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import {signOut} from 'firebase/auth'

export const useLogout = () => {

    const[error, setError] = useState(null)
    const[isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const logout = async ()=> {
        setError(null)
        setIsPending(true)

        try {

            await signOut(projectAuth)
            dispatch({type: 'LOGOUT'})
            setIsPending(false)
           setError(null)
            
        } catch (error) {
            console.log(error.message)
            setError(error.message)
            setIsPending(false)
        }
    }

    return {logout, error, isPending}

}