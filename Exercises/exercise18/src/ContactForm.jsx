import { useState } from 'react'

const emptyContact = { name: '', email: '', phone: '' }

function ContactForm({ dispatch, editingContact, setEditingContact }) {
  const [contact, setContact] = useState(
    editingContact ? { ...editingContact } : { ...emptyContact },
  )

  function handleChange(event) {
    const { name, value } = event.target
    setContact((currentContact) => ({ ...currentContact, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const normalizedContact = {
      ...contact,
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
    }

    if (!normalizedContact.name || !normalizedContact.email || !normalizedContact.phone) {
      return
    }

    if (editingContact) {
      dispatch({ type: 'edit', payload: normalizedContact })
      setEditingContact(null)
    } else {
      dispatch({
        type: 'add',
        payload: {
          ...normalizedContact,
          id: crypto.randomUUID(),
          favorite: false,
        },
      })
    }

    setContact(emptyContact)
  }

  function handleCancel() {
    setEditingContact(null)
    setContact(emptyContact)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
      <div>
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
      <div>
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
      <div>
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
      <button type="submit">{editingContact ? 'Update Contact' : 'Add Contact'}</button>
      {editingContact && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  )
}

export default ContactForm
