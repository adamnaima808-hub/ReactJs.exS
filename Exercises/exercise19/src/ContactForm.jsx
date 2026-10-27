import { useState, useEffect } from 'react';

const emptyContact = { id: null, name: '', email: '', phone: '' };

const ContactForm = ({ dispatch, editingContact, setEditingContact }) => {
  const [contact, setContact] = useState(editingContact || emptyContact);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingContact) {
      setContact({ ...emptyContact, ...editingContact });
      setIsEditing(true);
      return;
    }

    setContact(emptyContact);
    setIsEditing(false);
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((currentContact) => ({ ...currentContact, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.name && contact.email && contact.phone) {
      if (isEditing) {
        dispatch({ type: 'edit', payload: contact });
      } else {
        dispatch({
          type: 'add',
          payload: { ...contact, id: Date.now(), favorite: false },
        });
      }

      setContact(emptyContact);
      setIsEditing(false);
      setEditingContact(null);
    }
  };

  const handleCancelEdit = () => {
    setContact(emptyContact);
    setIsEditing(false);
    setEditingContact(null);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Contact' : 'Add New Contact'}</h2>
      <div className="form-field">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-field">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-field">
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-actions">
        <button className="button button-primary" type="submit">
          {isEditing ? 'Update' : 'Add contact'}
        </button>
        {isEditing && (
          <button
            className="button button-secondary"
            type="button"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
