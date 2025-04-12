import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/api/logs');
        setLogs(response.data);
      } catch (error) {
        alert('Error fetching logs');
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h1>Logs</h1>
      {logs.map((log) => (
        <div key={log._id}>
          <p>{log.action}</p>
          <p>{log.timestamp}</p>
        </div>
      ))}
    </div>
  );
}
