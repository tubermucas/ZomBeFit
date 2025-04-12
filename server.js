import express from 'express';
import mongoose from 'mongoose';
import userDataRoutes from './routes/userData';  // Import the new routes

const app = express();
app.use(express.json());  // Use middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost/z-data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use the routes
app.use('/api/userdata', userDataRoutes);  // Add the route for user data

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
