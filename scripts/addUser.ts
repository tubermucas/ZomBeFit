import axios from 'axios';

const newUser = {
  userId: 1,
  date: new Date().toISOString(),
  gender: "male",
  age: 21,
  weight: 165,
  height: 70,
  activityLvl: "moderate",
  fat: [60],
  protein: [130],
  carbs: [200],
  calIn: [1800],
  calOut: 0 // placeholder, will be set by Python
};

axios.post('http://127.0.0.1:8000/logs', newUser)
  .then(res => {
    console.log("✅ Data inserted into MongoDB via FastAPI:", res.data);
  })
  .catch(err => {
    console.error("❌ Error inserting user:", err.response?.data || err.message);
  });
