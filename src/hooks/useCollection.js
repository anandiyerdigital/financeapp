import {useEffect, useState} from 'react'
import { projectFirestore } from '../firebase/config'
import { collection, query, where, getDocs, onSnapshot, orderBy } from "firebase/firestore";

export const useCollection = (collect, uid) => {

    const [data, setData] = useState([])
    //console.log(uid)
    let id = String(uid)
    console.log('inside collection', id)

    useEffect(() => {

    
     
            const q = query(collection(projectFirestore, collect), where("uid", "==", id) );
 
            const unsubscribe = onSnapshot(q, (querySnapshot) => { 
                const results = []
                    
                querySnapshot.forEach((doc) => { 
                    results.push({...doc.data(), id:doc.id})    
                
               //console.log("From data state", doc.id, " => ", doc.data()); 
          


                });

                setData(results)
                
              });
    
            
               
            console.log(data) 
       
    


    }, [collect, uid])

    return { data }

}