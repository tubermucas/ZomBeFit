import express, { Request, Response } from 'express';
import Log from '../models/Log'; // Import the Log model

const router = express.Router();

// Create a new log
router.post('/', async (req: Request, res: Response) => {
  const { userId, action } = req.body;

  try {
    const newLog = new Log({ userId, action });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating log' });
  }
});

// Get all logs for a user
router.get('/', async (req: Request, res: Response) => {
  try {
    const logs = await Log.find().populate('userId', 'username email');
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs' });
  }
});

// Update a log entry
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { action } = req.body;

  try {
    const updatedLog = await Log.findByIdAndUpdate(id, { action }, { new: true });
    if (!updatedLog) return res.status(404).json({ message: 'Log not found' });
    res.json(updatedLog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating log' });
  }
});

// Delete a log entry
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedLog = await Log.findByIdAndDelete(id);
    if (!deletedLog) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting log' });
  }
});

export default router;
