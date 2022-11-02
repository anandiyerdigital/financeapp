import { AuthContext } from "../context/AuthContext";
import {useContext} from 'react'
import {toast} from 'react-toastify'
export const useAuthContext = () => {

    const context = useContext(AuthContext)

    if(!context){
        toast.error('useAuthContext must be inside an AuthContextProvider')
        throw Error('useAuthContext must be inside an AuthContextProvider')
    }

    return context

}