import { useReducer, useState } from 'react'
import { initialState, reducer } from './Reducer.js'
import ContactForm from './ContactForm.jsx'
import ContactList from './ContactList.jsx'

function ContactApp() {
  const [contacts, dispatch] = useReducer(reducer, initialState)
  const [editingContact, setEditingContact] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  )

  return (
    <main className="contact-app">
      <h1>Contact Management App</h1>
      <ContactForm
        key={editingContact ? editingContact.id : 'new'}
        dispatch={dispatch}
        editingContact={editingContact}
        setEditingContact={setEditingContact}
      />
      <section className="contacts-section" aria-labelledby="contacts-heading">
        <h2 id="contacts-heading">Contacts</h2>
        <label className="search-field">
          Search contacts:
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
        <ContactList
          contacts={filteredContacts}
          dispatch={dispatch}
          setEditingContact={setEditingContact}
          hasContacts={contacts.length > 0}
        />
      </section>
    </main>
  )
}

export default ContactApp
