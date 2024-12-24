import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EntryForm from '../components/EntryForm';

const EditEntry = ({ entries, onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const foundEntry = entries.find((entry) => entry.id === id);
    if (foundEntry) {
      setEntry(foundEntry);
    } else {
      navigate('/entries');
    }
  }, [id, entries, navigate]);

  const handleSave = (updatedEntry) => {
    onSave(id, updatedEntry);
    navigate('/entries');
  };

  return (
    <div className="edit-entry">
      {entry ? (
        <EntryForm initialData={entry} onSubmit={handleSave} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditEntry;
