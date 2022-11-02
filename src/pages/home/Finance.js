
import { useAuthContext } from '../../hooks/useAuthContext'
import TransactionForm from './TransactionForm'
import {useEffect, useState} from 'react'
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { projectFirestore } from '../../firebase/config';
import { useCollection } from '../../hooks/useCollection';
import TransactionList from '../../components/TransactionList';
import {toast} from 'react-toastify'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import TransactionCharts from '../../components/TransactionCharts';


export default function Finance() {


  const[user, setUser] = useState()
  const[uid, setuid] = useState() 
    const auth = getAuth()
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
       
        setUser(currentUser)
        setuid(currentUser.uid)
      }
    })

    useEffect(() => {

    }, [uid])



    console.log('inside finance', uid)
    const {data} = useCollection('transactions', uid) 
 
    // const getData = async () => {
    //     const q = query(collection(projectFirestore, "transactions"));

    //     const querySnapshot = await getDocs(q);
        
    //     querySnapshot.forEach((doc) => { 
    //      const temp = doc.data()
    //         console.log(temp)
    //        //console.log("From data state", doc.id, " => ", doc.data()); 
    //     setData(current => [...current, temp])  
              
    //     })  
 
    //     console.log(data) 
    //     return 
        
        


    // }



    // useEffect(() => {
    //     getData()
     
   
    // //     data.forEach((doc) => {
    // //     // doc.data() is never undefined for query doc snapshots
    // //    console.log("From data state", doc.id, " => ", doc.data());
    // //     }); 
    // }, [user]) 



    // useEffect(() => {

    //   if(user){
    //       toast('Welcome back, you are already signedin')
    //       console.log('from login page', user)
          
    //   }

    //   }, [user])

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        

        <div className="py-10 grid-cols-2">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
            </div>
          </header>
          <main>
            <div className="sm:px-6 lg:px-8 grid grid-cols-2">
              {/* Replace with your content */}
              <div className="px-4 py-8 sm:px-0 ">
               
              <TransactionList transactions = {data} />
               
                
              </div>

              <div className="px-4 py-8 sm:px-0">
              <TransactionForm />
              </div>

              <div className="px-4 py-8 sm:px-0">
               <TransactionCharts data={data}/>
              </div>


              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
