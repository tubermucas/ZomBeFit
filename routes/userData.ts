import express, { Request, Response } from 'express';
import UserData from '../models/UserData';  // Import the UserData model where logs are stored

const router = express.Router();

// Route to log fat intake
router.patch('/log-fat/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { fat } = req.body; // fat is a floating-point number
  const today = new Date().toISOString().split('T')[0];  // Get today's date (YYYY-MM-DD)

  try {
    const updatedUser = await UserData.findOneAndUpdate(
      { userId },  // Find user by their `userId`
      { 
        $push: {
          fatLogs: { date: today, value: fat }  // Push new log entry to `fatLogs` array
        }
      },
      { new: true }  // Return updated document
    );

    // Return the updated user data with the new fat log
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error logging fat', error: err });
  }
});

// Route to log calories intake
router.patch('/log-calories-in/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { caloriesIn } = req.body; // caloriesIn is a floating-point number
  const today = new Date().toISOString().split('T')[0];  // Get today's date (YYYY-MM-DD)

  try {
    const updatedUser = await UserData.findOneAndUpdate(
      { userId },  // Find user by their `userId`
      { 
        $push: {
          calInLogs: { date: today, value: caloriesIn }  // Push new log entry to `calInLogs` array
        }
      },
      { new: true }  // Return updated document
    );

    // Return the updated user data with the new calories log
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error logging calories in', error: err });
  }
});

// Route to log calories burned (caloriesOut)
router.patch('/log-calories-out/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { caloriesOut } = req.body;  // caloriesOut is a floating-point number
  const today = new Date().toISOString().split('T')[0];  // Get today's date (YYYY-MM-DD)

  try {
    const updatedUser = await UserData.findOneAndUpdate(
      { userId },  // Find user by their `userId`
      { 
        $push: {
          calOutLogs: { date: today, value: caloriesOut }  // Push new log entry to `calOutLogs` array
        }
      },
      { new: true }  // Return updated document
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error logging calories out', error: err });
  }
});

// Route to log protein intake
router.patch('/log-protein/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { protein } = req.body;  // protein is a floating-point number
  const today = new Date().toISOString().split('T')[0];  // Get today's date (YYYY-MM-DD)

  try {
    const updatedUser = await UserData.findOneAndUpdate(
      { userId },
      { 
        $push: {
          proteinLogs: { date: today, value: protein }  // Push new log entry to `proteinLogs` array
        }
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error logging protein', error: err });
  }
});

// Route to log carbs intake
router.patch('/log-carbs/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { carbs } = req.body;  // carbs is a floating-point number
  const today = new Date().toISOString().split('T')[0];  // Get today's date (YYYY-MM-DD)

  try {
    const updatedUser = await UserData.findOneAndUpdate(
      { userId },
      { 
        $push: {
          carbsLogs: { date: today, value: carbs }  // Push new log entry to `carbsLogs` array
        }
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error logging carbs', error: err });
  }
});

// Route to log weight
router.patch('/log-weight/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { weight } = req.body;  // weight is an integer (e.g., 165)
  const today = new Date().toISOString().split('T')[0];  // Get today's date (YYYY-MM-DD)

  try {
    const updatedUser = await UserData.findOneAndUpdate(
      { userId },
      { 
        $push: {
          weightLogs: { date: today, value: weight }  // Push new log entry to `weightLogs` array
        }
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error logging weight', error: err });
  }
});

export default router;
