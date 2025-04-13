import axios from 'axios';

axios.get('http://127.0.0.1:8000/logs/1')
  .then(res => {
    console.log("📊 Retrieved user data with calories out:", res.data);
  })
  .catch(err => {
    console.error("❌ Error fetching data:", err.response?.data || err.message);
  });
