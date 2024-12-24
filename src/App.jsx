import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import EditEntry from './pages/EditEntry';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import './styles/App.css';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);

  // Check localStorage for user token or credentials on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const addEntry = (entry) => {
    const newEntry = { ...entry, id: Date.now() };
    setEntries([...entries, newEntry]);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const updateEntry = (id, updatedEntry) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    );
  };

  const handleLogin = (userCredentials) => {
    setUser(userCredentials);
    localStorage.setItem('user', JSON.stringify(userCredentials)); // Save user to localStorage
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="top-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/entries" className="nav-link">Diary Entries</Link>
          <Link to="/create" className="nav-link">Create Entry</Link>
          {!user && <Link to="/login" className="nav-link">Login</Link>}
          {!user && <Link to="/register" className="nav-link">Register</Link>}
          {user && <button onClick={handleLogout} className="logout-button">Logout</button>}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="welcome">
                <h1>Welcome to the Notebook App by Khaled Alrantisi</h1>
              </div>
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/entries" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/entries" /> : <Register />}
          />
          <Route
            path="/entries"
            element={
              user ? (
                <EntryList entries={entries} onDelete={deleteEntry} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/create"
            element={user ? <EntryForm onSubmit={addEntry} /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={user ? <EditEntry entries={entries} onSave={updateEntry} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
