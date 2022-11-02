import React from 'react'
import {useState} from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import{doc, setDoc, addDoc, collection} from 'firebase/firestore'
import { projectFirestore } from '../../firebase/config'
import {toast} from 'react-toastify'

import {getAuth, onAuthStateChanged} from 'firebase/auth'

const TransactionForm = () => {

const[name, setName] = useState('')
const [amount, setAmount] = useState('')
const {addDocument, response} = useFirestore('transactions')

const[user, setUser] = useState()
const[uid, setuid] = useState()   
    const auth = getAuth()
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        
        setUser(currentUser)
       setuid(currentUser.uid)
        
      }
    })
  

console.log('got the user from finance', user) 



const handleSubmit = async (e) => {
    e.preventDefault()
   
    var timestamp = Date.now()
    console.log(timestamp)
    var createdAt = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)

   
    //console.log('reacher here', user.uid)
    

    const docRef = await addDoc(collection(projectFirestore, 'transactions'), {name, amount, uid, createdAt})
    if(docRef) {
        toast.success("Document Added")

    }

    //addDocument({name, amount, uid, createdAt})

    // addDocument({
      
    //     name,
    //     amount
    // })

    


}

  return (
    <div>

<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Add a Transaction</h2>
          
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="transaction" className="block text-sm font-medium text-gray-700">
                  Transaction Name:
                </label>
                <div className="mt-1">
                  <input
                    id="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name="transactionName"
                    type="transactionName"
                    autoComplete="transactionName"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Amount($):
                </label>
                <div className="mt-1">
                  <input
                    id="amount"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    name="amount"
                    type="number"
                    autoComplete="amount"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add Transaction
                </button>
              </div>
            </form>

            
          </div>
        </div>
      </div>


    </div>
  )
}

export default TransactionForm