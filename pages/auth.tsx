import { useState } from 'react';
import axios from 'axios';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('/api/auth/signup', { email, password });
      alert('User created successfully');
    } catch (error) {
      alert('Error signing up');
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post('/api/auth/signin', { email, password });
      setToken(response.data.token);
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
      {token && <p>Token: {token}</p>}
    </div>
  );
}
