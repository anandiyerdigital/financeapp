

import { Configuration, OpenAIApi } from "openai";


import { useState } from "react";


export default function Home() {


  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState('');



  async function onSubmit(event) { 
    event.preventDefault();
    


    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_DALLEIMAGE,
    });

    const openai = new OpenAIApi(configuration) 

    const response = await openai.createImage({
        prompt: animalInput,
        n: 2,
        size: "1024x1024",
      });

    console.log(openai)
    console.log(response.data.data[0].url)
    setResult(response.data.data[0].url)
    // openai.createCompletion({
    //   model: "text-davinci-002",
    //   prompt: "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ:",
    //   temperature: 0,
    //   max_tokens: 100,
    //   top_p: 1,
    //   frequency_penalty: 0,
    //   presence_penalty: 0,
    //   stop: ["\n"],

    // }).then((response)=>{
    //   console.log(response.data.choices[0].text)
    //   setResult(response.data.choices[0].text)
      
    // })

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
        {/* <img src={logo} /> */}
          <h1 className="text-5xl font-bold">AI Image Generation Bot</h1>
          
          <p className="py-6">
          I am a highly intelligent image generation bot built by Digital Creative Team. If you ask me to create an image, I will generate a realistic image. If you ask me create a ficticious, unrealistic, and imaginary image then i will do my best.
          </p>

          <form onSubmit={onSubmit} method="post">
          <input
          class="input w-full max-w-xs"
            type="text"
            name="animal"
            placeholder="Enter description of the image"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 mx-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="submit" value="Give me the answer">Submit</button>
        </form>

        <div className = "px-3 py-5">
            {result && <img src={result} />}
        </div>

        </div>

      
        
        
      </div>
    </div>
  );
}