import axios from 'axios';

const userProfile = require('./sample.json');

axios.post('http://localhost:5000/api/userdata', userProfile)
  .then(res => {
    console.log("✅ User profile inserted:", res.data);
  })
  .catch(err => {
    console.error("❌ Error inserting user profile:", err.response?.data || err.message);
  });
