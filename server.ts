import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userDataRoutes from './routes/userData';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/userdata', userDataRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
