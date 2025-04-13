import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  // ✅ Load token from localStorage on page load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  // ✅ Handle sign-up
  const handleSignUp = async () => {
    try {
      const response = await axios.post('/api/auth/signup', { email, password });
      alert('User created successfully');
    } catch (error) {
      alert('Error signing up');
    }
  };

  // ✅ Handle sign-in and save token
  const handleSignIn = async () => {
    try {
      const response = await axios.post('/api/auth/signin', { email, password });
      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', token); // store for future use
      alert('Signed in successfully');
    } catch (error) {
      alert('Error signing in');
    }
  };

  return (
    <div>
      <h1>Auth Page</h1>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>

      {token && (
        <div>
          <p>✅ Logged in</p>
          <p>Token: {token}</p>
        </div>
      )}
    </div>
  );
}
