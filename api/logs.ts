import express, { Request, Response } from 'express';
import Log from '../models/Log';

const router = express.Router();

// Create a new log
router.post('/activity', async (req: Request, res: Response) => {
  const { userId, action } = req.body;

  try {
    const newLog = new Log({ userId, action });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating log' });
  }
});

// Get paginated logs for a user
router.get('/activity', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const logs = await Log.find()
      .sort({ timestamp: -1 }) // newest first
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('userId', 'email');

    const total = await Log.countDocuments();

    res.json({
      logs,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs' });
  }
});

// Update a log
router.put('/activity/:id', async (req: Request, res: Response) => {
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

export default router;
