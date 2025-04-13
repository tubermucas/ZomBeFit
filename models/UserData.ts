import mongoose from 'mongoose';

const logEntrySchema = new mongoose.Schema({
  date: { type: String, required: true }, // e.g. "2025-04-13"
  value: { type: Number, required: true }
}, { _id: false });

const userDataSchema = new mongoose.Schema({
  userId: { type: String },  // optional external ID
  dateCreated: { type: Date, default: Date.now },

  gender: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  activityLvl: { 
    type: String, 
    required: true, 
    enum: ['light', 'moderate', 'heavy', 'athlete'] 
  },

  fatLogs: [logEntrySchema],
  proteinLogs: [logEntrySchema],
  carbsLogs: [logEntrySchema],
  calInLogs: [logEntrySchema],
  calOutLogs: [logEntrySchema]
});

const UserData = mongoose.model('users', userDataSchema);

export default UserData;
