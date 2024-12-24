import React, { useState } from 'react';
import EntryForm from '../components/EntryForm';
import EntryList from '../components/EntryList';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries([...entries, { ...entry, id: uuidv4() }]);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div>
      <h1>Welcome to the Notebook</h1>
      <EntryForm onSubmit={addEntry} />
      <EntryList entries={entries} onDelete={deleteEntry} />
    </div>
  );
};

export default Home;
