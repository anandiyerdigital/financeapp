import React from "react";
import { useState, useEffect } from "react";
import TMRimage from "../images/tmr.png";

const AlltechImageClassifier = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [highScore, setHighScore] = useState(null);

  const TrainingApi = require("@azure/cognitiveservices-customvision-training");
  const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
  const msRest = require("@azure/ms-rest-js");
  const predictionKey = process.env.REACT_APP_AZURE_APIKEY;
  const predictionResourceId = process.env.REACT_APP_AZURE_RESOURCEID;
  const predictionEndpoint = process.env.REACT_APP_AZURE_ENDPOINT;

  const predictor_credentials = new msRest.ApiKeyCredentials({
    inHeader: { "Prediction-key": predictionKey },
  });
  const predictor = new PredictionApi.PredictionAPIClient(
    predictor_credentials,
    predictionEndpoint
  );

  useEffect(() => {
    findMax();
  }, [result, highScore]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const result = await predictor.classifyImage(
      "f9bc7cba-712f-4133-8336-6c39ae80e27e",
      "Iteration1",
      image
    );
    setResult(result.predictions);
    console.log(result.predictions);
  };

  const findMax = () => {
    if (result) {
      const temp = result.reduce((prev, current) => {
        return prev.probability > current.probability ? prev : current;
      });

      setHighScore(temp);
      console.log("highscore is", highScore);
    }
  };

  return (
    <div>
      <div className=" flex p-3 m-3 w-80 content-center justify-center">
        <form onSubmit={handleSubmit}>
       
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            className="bg-amber-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full p-3 m-3"
            type="submit"
          >
            Detect TRM Score
          </button>
        </form>
      </div>

      <div className="flex flex-row px-5 m-2 space-x-4">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-2">
          <a href="#">
            {image ? (
              <img
                class="rounded-t-lg w-96 h-96"
                src={URL.createObjectURL(image)}
                alt=""
              />
            ) : null}
          </a>

          <div></div>

          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                The uploaded mixed ration is of category: {highScore?.tagName}
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Other categories are:
              {result?.map((item, index) => (
                <div key={index}>
                  <p>{item.tagName}</p>
                  <p>{item.probability}</p>
                </div>
              ))}
            </p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                class="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>

        <div class=" bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-2">
          <a href="#">
            <img class="rounded-t-lg" src={TMRimage} alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                What is a total mixed ration (TMR)?
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              A TMR is a method of feeding cows that combines feeds formulated
              to a specific nutrient content into a single feed mix. The mix
              contains the following feeds. Forages, Grains, Protein, Feeds,
              Minerals, Vitamins, Feed additives
            </p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                class="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlltechImageClassifier;
