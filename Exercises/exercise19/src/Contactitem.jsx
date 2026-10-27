// ContactItem.jsx
const ContactItem = ({ contact, dispatch, setEditingContact }) => {
  const { id, name, email, phone, favorite } = contact;

  return (
    <li className="contact-card">
      <div className="contact-details">
        <strong>{name}</strong>{' '}
        {favorite && (
          <span className="favorite-star" aria-label="Favorite">
            ★
          </span>
        )}
        <p>
          <span>Email</span>
          {email}
        </p>
        <p>
          <span>Phone</span>
          {phone}
        </p>
      </div>
      <div className="contact-actions">
        <button
          className="button button-secondary"
          onClick={() => dispatch({ type: 'toggleFavorite', payload: id })}
        >
          {favorite ? 'Unfavorite' : 'Favorite'}
        </button>
        <button
          className="button button-secondary"
          onClick={() => setEditingContact(contact)}
        >
          Edit
        </button>
        <button
          className="button button-danger"
          onClick={() => dispatch({ type: 'delete', payload: id })}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ContactItem;