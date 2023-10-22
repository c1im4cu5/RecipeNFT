import React, { useState } from "react";

const obituaryForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (file && name && message) {
      // Do something with the file, name, and message
      console.log("File: ", file);
      console.log("Name: ", name);
      console.log("Message: ", message);
      // Reset the form
      setFile(null);
      setFileName("");
      setName("");
      setMessage("");
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="fileInput">Upload a picture:</label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileInputChange}
          required
        />
        {file && (
          <div>
            <p>Selected file: {fileName}</p>
            <img src={URL.createObjectURL(file)} alt="Selected file preview" />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="nameInput">Name:</label>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="messageInput">Message:</label>
        <textarea
          id="messageInput"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default obituaryForm;
