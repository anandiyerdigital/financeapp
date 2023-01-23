import React, { useState } from 'react';

function FileUploader() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = event => {
    setFiles([...event.target.files]);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => {
          const res = event.target.result;
          resolve(res);
        };
        reader.readAsDataURL(file);
      });
    });

    const base64files = await Promise.all(promises);

    const data = {
      api_key: "-- ask for one: https://web.plant.id/api-access-request/ --",
      images: base64files,
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      plant_details: ["common_names", "url", "name_authority", "wiki_description", "taxonomy", "synonyms"],
    };

    try {
      const response = await fetch('https://api.plant.id/v2/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form>
      <input type="file" multiple onChange={handleFileUpload} />
      <button type="button" onClick={handleSubmit}>
        OK
      </button>
    </form>
  );
}

export default FileUploader;
