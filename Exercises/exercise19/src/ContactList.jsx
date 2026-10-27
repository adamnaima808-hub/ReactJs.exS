// ContactList.jsx
import ContactItem from './Contactitem.jsx';

function ContactList({ contacts, dispatch, setEditingContact }) {
    return (
        <div className="contact-list">
            {contacts.length > 0 ? (
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
            ) : (
                <p className="empty-state">No contacts available.</p>
            )}
        </div>
    );
}

export default ContactList;
