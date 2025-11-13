import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

   // const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const endpoint = isRegister 
  ? 'http://localhost:5000/api/auth/register' 
  : 'http://localhost:5000/api/auth/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      if (isRegister) {
        alert('Registration successful! You can now log in.');
        setIsRegister(false);
        setUsername('');
        setPassword('');
      } else {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>

        {error && <p className="error-msg">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>

        <p className="toggle-text">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
