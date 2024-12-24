import  { useState } from 'react';

const EntryForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [image, setImage] = useState(initialData?.image || null);
  const [error, setError] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result); // Convert to base64
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setImage(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required!');
      return;
    }
    onSubmit({ title, content, image });
    setTitle('');
    setContent('');
    setImage(null);
    setError('');
  };

  return (
    <div className="entry-form">
      <h2>{initialData ? 'Edit Entry' : 'Create New Entry'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            rows="4"
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" onChange={handleImageChange} />
          {image && (
            <div className="image-preview">
              <img src={image} alt="Preview" width="100" height="100" />
              <button type="button" onClick={removeImage}>
                Remove Image
              </button>
            </div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EntryForm;



