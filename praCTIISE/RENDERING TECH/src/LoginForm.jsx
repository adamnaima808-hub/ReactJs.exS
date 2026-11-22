import { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsAuthenticated(true);
    setPassword('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  if (isAuthenticated) {
    return (
      <main className="login-page">
        <section className="login-card" aria-labelledby="welcome-heading">
          <h1 id="welcome-heading">Welcome,{username}!</h1>
          <p>You are now logged in.</p>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-heading">
        <h1 id="login-heading">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
};

export default LoginForm;
