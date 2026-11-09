import { useState } from 'react';

function RegistrationForm() {
  // 1. Manage the state for all form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Developer', // Default option for the select dropdown
    subscribe: false    // Checkbox state
  });

  // State to hold and display the submitted data
  const [submittedData, setSubmittedData] = useState(null);

  // 2. Handle input changes dynamically using the 'name' attribute
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      // If it's a checkbox, use 'checked'; otherwise, use 'value'
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 3. Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on submit
    setSubmittedData(formData);
  };

  return (
    <main className="page">
      <section className="registration-card">
        <header className="form-header">
          <span className="form-eyebrow">GET STARTED</span>
          <h1>Create your account</h1>
          <p>Fill in your details to join the community.</p>
        </header>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          </div>

          <div className="form-field">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          </div>

          <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          </div>

          <div className="form-field">
          <label htmlFor="role">Your role</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          </div>

          <label className="checkbox-field">
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <span>Send me product updates and news</span>
          </label>

          <button className="submit-button" type="submit">Create account</button>
        </form>

        {submittedData && (
          <section className="submitted-data" aria-live="polite">
            <h2>Account details saved</h2>
            <p><strong>Username</strong><span>{submittedData.username}</span></p>
            <p><strong>Email</strong><span>{submittedData.email}</span></p>
            <p><strong>Role</strong><span>{submittedData.role}</span></p>
            <p><strong>Newsletter</strong><span>{submittedData.subscribe ? 'Subscribed' : 'Not subscribed'}</span></p>
          </section>
        )}
      </section>
    </main>
  );
}

export default RegistrationForm;