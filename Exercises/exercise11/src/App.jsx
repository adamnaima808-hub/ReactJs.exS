import { useState } from 'react'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedInUsername, setLoggedInUsername] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setLoggedInUsername(username.trim())
  }

  function handleLogout() {
    setLoggedInUsername('')
    setUsername('')
    setPassword('')
  }

  if (loggedInUsername) {
    return (
      <div>
        <h1>Welcome, {loggedInUsername}!</h1>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    )
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          required
          value={username}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm