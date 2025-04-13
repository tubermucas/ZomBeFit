import mongoose from 'mongoose';

// Define the schema for user data
const userDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  caloriesIn: {
    type: Number,
    required: false,
  },
  caloriesOut: {
    type: Number,
    required: false,
  },
  height: {
    type: Number,
    required: true, // In inches or centimeters, you can specify units
  },
  weight: {
    type: Number,
    required: true, // In pounds or kilograms, you can specify units
  },
  age: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: false, // "Male" or "Female" or other, depending on the use case
  },
  bodyFatPercentage: {
    type: Number,
    required: false, // Percentage (e.g., 20% = 20)
  },
  fatGrams: {
    type: Number,
    required: false,
  },
  proteinGrams: {
    type: Number,
    required: false,
  },
  carbsGrams: {
    type: Number,
    required: false,
  },
  goal: {
    type: String,
    enum: ['Lose weight', 'Gain muscle', 'Maintain'],
    required: true,
  },
  targetWeight: {
    type: Number,
    required: true,
  },
  targetBodyFatPercentage: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Create a model for the schema
const UserData = mongoose.model('users', userDataSchema);

export default UserData;
