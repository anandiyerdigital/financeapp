import {useReducer, useEffect, useState} from 'react'
import { projectFirestore } from '../firebase/config'
import {collection, doc, getDoc, setDoc, addDoc} from 'firebase/firestore'
import {toast} from 'react-toastify'



let initialState = {
    document:  null,
    isPending: false,
    error: null,
    success: null
}


const firestoreReducer = (state, action) => {

    switch(action.type){

        case 'IS_PENDING':
            return { document: null, success: false, error: null, isPending: true}
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null}
        case 'ERROR':
            return {isPending: false, document: null, success: false, error: action.payload}

        default:
            return state

    }

}

export const useFirestore = (collection) => {

    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection ref

    //const ref = doc(projectFirestore, collection)

    // add document

    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})

        try {
            
            //const createdAt = new firebase.firestore.Timestamp()
            console.log('reached add doc')
            console.log(doc)
            const docRef = await addDoc(collection(projectFirestore, 'transactions'), {...doc})
            
            

            console.log(docRef)

            dispatch({type: 'ADDED_DOCUMENT', payload: addDocument })
            

            toast.success('Document Added Successfully')


        } catch (error) {
            dispatch({type: 'ERROR', payload: error.message})
        }

    }

    // delete document

    const deleteDocument = async (id) => {

    }

    useEffect(() => {

        return () => setIsCancelled(true)

    }, [])

    return {addDocument, deleteDocument, response }

}