import React from 'react'
import {useEffect, useState} from 'react'
import { SunIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Weather = () => {

    const [data, setData] = useState([]);
    const [lat, setLat] = useState()
    const [lon, setLong] = useState()
    const API_KEY = "9504a30a68b2a0b09f8d1de3efe91498"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    
    // const options = {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json;charset=UTF-8'
    //     },
    //     body: JSON.stringify({
    //       a: 10,
    //       b: 20
    //     })
    //   };
 


    const getdata = async () => {

        const response = await fetch(url)
       
        const data1 = await response.json()
        
        setData(data1)  
        console.log(data.weather[0].description) 
    }   
    
    
      
    
    
    
    
    
    
    useEffect(() => {
       
        navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude)
            
            setLong(position.coords.longitude)
           
          });

        getdata()
    
    
     
       }, []);

 

 


  return (
    <div>
        
      
      <div className="py-3 px-3 sm:px-6 ">
        <div className="flex flex-wrap items-center justify-between">
          
          <div className="text-blue-600">
          <p>Weather is <b>{data.weather[0].description}</b> in { data.name} </p>
          </div>
          
        
          <div className="flex w-0 flex-1 mx-1 items-center">
            <span className="flex rounded-lg bg-indigo-800 p-2">
              <SunIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
          </div>
          
      
      </div>
    </div>
        
        
       
        
        
        
        </div>
  )
}

export default Weather