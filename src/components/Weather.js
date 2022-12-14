import React from 'react'
import {useEffect, useState} from 'react'
import { SunIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Weather = () => {

    const [data, setData] = useState([]);
    const [lat, setLat] = useState(37.8806)
    const [lon, setLong] = useState(-84.5730)
    const [info, setInfo] = useState("Clear")
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}`
    
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

        navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude)
             console.log(lat)
            setLong(position.coords.longitude)
            console.log(lon)
            
           
          });
        const response = await fetch(url) 
       
        const data1 = await response.json()
        console.log(data1)
        setInfo(data1.weather[0].description)
        setData(data1)  
        //console.log(data.weather[0].description) 
    }   
    
     
      
    
    
    
    
    
    
    useEffect(() => {
       
        

        getdata() 
    
    
     
       }, []);

 
   

 


  return (
    <div>
        
      
      <div className="py-3 px-3 sm:px-6 ">
        <div className="flex flex-wrap items-center justify-between">
          
          <div className="text-blue-600"> 
        
  
         {data && <p>Weather is <b>{info}</b> in { data.name}. </p>   }
          </div>
          
        
          <div className="flex w-0 flex-1 mx-1 items-center">
            <span className="flex rounded-lg bg-indigo-800 p-2">
              <SunIcon onClick={getdata} className="h-6 w-6 text-white" aria-hidden="true" />  
            </span>
          </div>
          
      
      </div>
    </div>
        
        
       
        
        
        
        </div>
  )
}

export default Weather