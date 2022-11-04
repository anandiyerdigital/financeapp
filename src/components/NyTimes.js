import React from 'react'
import {useState, useEffect} from 'react'

const NyTimes = () => {


    const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);




const url = `https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=${process.env.REACT_APP_NYTIMES_API}`

const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      a: 10,
      b: 20
    })
  };

const getdata = async () => {

    const response = await fetch(url, options)
    const data1 = await response.json()
   
    setData(data1.results)  
    
}









useEffect(() => {
     
    getdata()


 
   }, []);

  return (
    
    <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
    <div className="absolute inset-0">
      <div className="h-1/3 bg-white sm:h-2/3" />
    </div>
    <div className="relative mx-auto max-w-7xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Related Blogs</h2>
        <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
          Enjoy the latest blogs...
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
        {data.map((post) => (
          <div key={post.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover" src={post.media[0]["media-metadata"][2].url} alt="" />
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600">
                
                </p>
                <a href={post.url} className="mt-2 block">
                  <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                  <p className="mt-3 text-base text-gray-500">{post.description}</p>
                </a>
              </div> 
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                 
                </div>
                <div className="ml-3"> 
                 
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime={post.datetime}>{post.published_date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>by {post.byline}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        ))}
      </div>
    </div>
  </div>



  )
  
}

export default NyTimes