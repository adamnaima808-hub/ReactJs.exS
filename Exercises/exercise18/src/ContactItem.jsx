function ContactItem({ contact, dispatch, setEditingContact }) {
  const { id, name, email, phone, favorite } = contact

  return (
    <li>
      <h3>
        {favorite ? `${name} ★` : name}
      </h3>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <button
        type="button"
        aria-pressed={Boolean(favorite)}
        onClick={() => dispatch({ type: 'toggleFavorite', payload: id })}
      >
        {favorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
      <button type="button" onClick={() => setEditingContact(contact)}>
        Edit
      </button>
      <button type="button" onClick={() => dispatch({ type: 'delete', payload: id })}>
        Delete
      </button>
    </li>
  )
}

export default ContactItem
