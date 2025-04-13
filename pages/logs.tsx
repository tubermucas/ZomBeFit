import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
  
        const response = await axios.get('/api/logs/activity', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        setLogs(response.data.logs); // updated for paginated response
      } catch (error) {
        alert('Error fetching logs');
      }
    };
  
    fetchLogs();
  }, []);
  

  return (
    <div>
      <h1>Logs</h1>
      {logs.length > 0 ? logs.map((log) => (
        <div key={log._id}>
          <p>Action: {log.action}</p>
          <p>Time: {new Date(log.timestamp).toLocaleString()}</p>
        </div>
      )) : (
        <p>No logs available.</p>
      )}
    </div>
  );
    
}
