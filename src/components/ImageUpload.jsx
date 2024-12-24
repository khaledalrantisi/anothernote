import React, { useState } from 'react';

const ImageUpload = ({ onUpload, currentImages = [] }) => {
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState(currentImages || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Validate file format
  const validateFile = (file) => {
    const validFormats = ['image/jpeg', 'image/png', 'image/gif'];
    return validFormats.includes(file.type);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
    const newPreviewUrls = [];
    let isValid = true;

    files.forEach((file) => {
      if (validateFile(file)) {
        newImages.push(file);
        newPreviewUrls.push(URL.createObjectURL(file)); // Preview for each valid image
      } else {
        isValid = false;
      }
    });

    if (!isValid) {
      setError('Invalid file format. Please upload only image files.');
    } else {
      setError(null);
      setImages(newImages);
      setPreviewUrls(newPreviewUrls);
    }
  };

  const handleUpload = async () => {
    if (images.length === 0) return;

    setLoading(true);
    try {
      // Assuming onUpload is a function that handles the image upload to a server
      await onUpload(images); // Pass the images to the parent component for upload
      setImages([]);
      setPreviewUrls([]);
    } catch (err) {
      setError('Upload failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />
      {error && <p className="error">{error}</p>}
      <div className="image-previews">
        {previewUrls.map((url, index) => (
          <div key={index} className="image-preview">
            <img src={url} alt="Preview" width="100" height="100" />
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleUpload} disabled={loading || images.length === 0}>
        {loading ? 'Uploading...' : 'Upload Images'}
      </button>
    </div>
  );
};

export default ImageUpload;
