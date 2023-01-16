import React from 'react'
import { useState } from 'react';




const AlltechImageClassifier = () => {
  
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);

    
const TrainingApi = require("@azure/cognitiveservices-customvision-training");
const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");
const predictionKey = process.env.REACT_APP_AZURE_APIKEY
const predictionResourceId = process.env.REACT_APP_AZURE_RESOURCEID
const predictionEndpoint = process.env.REACT_APP_AZURE_ENDPOINT

const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": predictionKey } });
const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, predictionEndpoint);


  
    const handleSubmit = async event => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("image", image);
      
        const result = await predictor.classifyImage("f9bc7cba-712f-4133-8336-6c39ae80e27e", "Iteration1", image);
        setResult(result.predictions);
        console.log(result.predictions)

    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
        />
        <button type="submit">Classify Image</button>
        {result ? <p>Result: {JSON.stringify(result)}</p> : null}
      </form>
    );


}

export default AlltechImageClassifier