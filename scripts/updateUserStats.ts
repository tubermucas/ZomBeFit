import axios from 'axios';

const userId = "user123"; // The same userId we inserted earlier

const newStats = {
  fat: 60.5,       // New fat intake (float)
  caloriesIn: 2000, // New calories intake (float)
  caloriesOut: 2200 // New calories burned (float)
};

axios.patch(`http://localhost:5000/api/userdata/log-fat/${userId}`, { fat: newStats.fat })
  .then(res => {
    console.log("✅ Fat logged:", res.data);
  })
  .catch(err => {
    console.error("❌ Error logging fat:", err.response?.data || err.message);
  });

axios.patch(`http://localhost:5000/api/userdata/log-calories-in/${userId}`, { caloriesIn: newStats.caloriesIn })
  .then(res => {
    console.log("✅ Calories In logged:", res.data);
  })
  .catch(err => {
    console.error("❌ Error logging calories in:", err.response?.data || err.message);
  });

axios.patch(`http://localhost:5000/api/userdata/log-calories-out/${userId}`, { caloriesOut: newStats.caloriesOut })
  .then(res => {
    console.log("✅ Calories Out logged:", res.data);
  })
  .catch(err => {
    console.error("❌ Error logging calories out:", err.response?.data || err.message);
  });
