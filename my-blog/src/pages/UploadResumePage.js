import React, { useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
const UploadResumePage = () => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    const response = await axios.post("/api/upload-resume");
    const formData = response.file;
    if (response) {
      console.log(selectedFile.name);
    }
    // formData.append("resume", selectedFile);
  };

  return (
    <div>
      <h1>Upload Resume Page</h1>
      <input type="file" onChange={handleFileInput} />
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadResumePage;
