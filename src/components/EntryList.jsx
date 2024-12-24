import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EntryList.css';

const EntryList = ({ entries, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Handle delete request
  const handleDelete = (id) => {
    setConfirmDelete(id);
  };

  // Confirm and proceed with deletion
  const confirmDeletion = () => {
    if (confirmDelete) {
      onDelete(confirmDelete);
      setConfirmDelete(null);
    }
  };

  // Cancel the delete confirmation
  const cancelDeletion = () => {
    setConfirmDelete(null);
  };

  // Utility function to truncate content safely
  const truncateContent = (content, length = 100) => {
    return content.length > length ? `${content.substring(0, length)}...` : content;
  };

  return (
    <div className="entry-list">
      <h2>Diary Entries</h2>

      {/* Empty state message */}
      {entries.length === 0 ? (
        <div className="empty-state">
          <p>No diary entries available. Start by creating your first entry!</p>
          <Link to="/create" className="create-entry-link">
            Create Entry
          </Link>
        </div>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id} className="entry-item">
              <h3>{entry.title}</h3>
              <p>{truncateContent(entry.content)}</p>

              {/* Display image thumbnail if an image exists */}
              {entry.image && (
                <div className="entry-image">
                  <img
                    src={entry.image}
                    alt={`Thumbnail for ${entry.title}`}
                    className="thumbnail"
                  />
                </div>
              )}

              <div className="entry-actions">
                <Link to={`/edit/${entry.id}`} className="edit-link">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Confirmation dialog for delete action */}
      {confirmDelete && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this entry?</p>
          <div className="confirmation-buttons">
            <button
              onClick={confirmDeletion}
              className="confirm-button"
            >
              Delete
            </button>
            <button onClick={cancelDeletion} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryList;
