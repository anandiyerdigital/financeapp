



import { Configuration, OpenAIApi } from "openai";


import { useState } from "react";


export default function TextGeneration() {


  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();



  async function onSubmit(event) {
    event.preventDefault();
    


    const configuration = new Configuration({
        organization: process.env.REACT_APP_ORGANIZATION,
        apiKey: process.env.REACT_APP_DALLEIMAGE,
    });

    const openai = new OpenAIApi(configuration)

    console.log(openai)
    
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: animalInput,
        max_tokens: 200,
        temperature: 0,
      });

      console.log(response.data)
      console.log(response.data.choices[0].text)
      setResult(response.data.choices[0].text)

    function generatePrompt(animal) {
      const capitalizedAnimal =
        animal[0].toUpperCase() + animal.slice(1).toLowerCase();
      return `${capitalizedAnimal}`;
    }

  
    
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
        
          <h1 className="text-5xl font-bold">AI Bot</h1>
          
          <p className="py-6">
          I am a highly intelligent question answering bot built by Digital Creative Team. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".
          </p>

          <form onSubmit={onSubmit} method="post">
          <input
          class="input w-full max-w-xs"
            type="text"
            name="animal"
            placeholder="Please enter a question here"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 mx-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="submit" value="Give me the answer">Submit</button>
        </form>

        <div>{result}</div>

        </div>

      
        
        
      </div>
    </div>
  );
}




