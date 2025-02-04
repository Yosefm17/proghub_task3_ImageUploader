import { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Only JPEG, PNG, and GIF files are allowed.");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File size must be less than 5MB.");
      return;
    }

    setErrorMessage("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!image) return alert("Please select an image first.");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedUrl(response.data.url);
      setPreview(null); // Reset preview after upload
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {preview && <img src={preview} alt="Preview" className="preview-image" width={200} />}
      
      <button className="upload-button" onClick={uploadImage} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <p>
          Uploaded Image: <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a>
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
