import { async } from "@firebase/util";
import React from "react";
import { useState, useEffect } from "react";
import TMRimage from "../images/tmr.png";
import PlantId from "../assets/plantid.png";

import axios from "axios";

const DigitalCropScience = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState();
  const [plantData, setPlantData] = useState(null);
  const [highScore, setHighScore] = useState(null);
  const [base64new, setBase64new] = useState(null);

  const [files, setFiles] = useState([]);

  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const api_key = process.env.REACT_APP_PLANTAPI;

  const handleFileUpload = (event) => {
    setFiles([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const base64files = await Promise.all(
      files.map(async (file) => {
        const reader = new FileReader();
        const res = await new Promise((resolve, reject) => {
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.readAsDataURL(file);
        });
        console.log(res);
        return res;
      })
    );

    console.log(base64files);

    const data = {
      api_key: api_key,
      images: base64files,
      // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
      plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms",
      ],
    };

    const response = await fetch("https://api.plant.id/v2/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    console.log("Success:", jsonData.suggestions);
    setPlantData(jsonData.suggestions[0]);
    console.log("Planet Data is", plantData);
  };

  //   const findMax = () => {
  //     if (result) {
  //       const temp = result.reduce((prev, current) => {
  //         return prev.probability > current.probability ? prev : current;
  //       });

  //       setHighScore(temp);
  //       console.log("highscore is", highScore);
  //     }
  //   };

  return (
    <div>
      <div className=" flex p-3 m-3 w-80 content-center justify-center">
        <form onSubmit={handleSubmit}>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e)}
          />
          <button
            className="bg-amber-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full p-3 m-3"
            type="submit"
          >
            Identify Plant
          </button>
        </form>
      </div>

      <div className="flex flex-row px-5 m-2 space-x-4">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-2">
          {/* <a href="#">
            {files ? (
              <img
                class="rounded-t-lg w-96 h-96"
                src={URL.createObjectURL(files)}
                alt=""
              />
            ) : null}
          </a> */}

          <div></div>

          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                The uploaded plant image is:{" "}
                {plantData?.plant_name}
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {/* Other categories are: */}
              {/* {result?.map((item, index) => (
                <div key={index}>
                  <p>{item.plant_name}</p>
                  <p>{item.probability}</p>
                </div>
              ))} */}
            </p>
            <p>
               {plantData?.plant_details.wiki_description.value}
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
            <img class="rounded-t-lg" src={PlantId} alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                What is plant identification?
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              This tool identifies plant species and diseases from
              photos with machine learning. Send us images of your plant and get
              the possible suggestions with plenty of other information
              including representative images of the species.
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

export default DigitalCropScience;
