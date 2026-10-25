import ContactItem from './ContactItem.jsx'

function ContactList({ contacts, dispatch, setEditingContact, hasContacts }) {
  if (contacts.length === 0) {
    return <p>{hasContacts ? 'No contacts match your search' : 'No contacts yet'}</p>
  }

  return (
    <ul>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          dispatch={dispatch}
          setEditingContact={setEditingContact}
        />
      ))}
    </ul>
  )
}

export default ContactList
