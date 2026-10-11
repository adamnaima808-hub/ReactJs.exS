import { useState, useEffect } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('octocat');
  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      console.error('Error fetching user data:', error);
    }
  }, [error]);

  const handleSearch = async () => {
    const term = searchTerm.trim();

    if (!term) {
      return;
    }

    setLoading(true);
    setError(null);
    setUserdata(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(`https://api.github.com/users/${term}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserdata(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>GitHub User Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter GitHub username..."
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {userdata && (
        <div style={{ marginTop: '1rem' }}>
          <h2>{userdata.login}</h2>
          <img
            src={userdata.avatar_url}
            alt={userdata.login}
            width="100"
            style={{ borderRadius: '50%' }}
          />
          <p>Location: {userdata.location || 'N/A'}</p>
          <p>Public Repos: {userdata.public_repos}</p>
        </div>
      )}
    </div>
  );
};

export default App;