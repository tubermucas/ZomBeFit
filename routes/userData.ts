import express, { Request, Response } from 'express';
import UserData from '../models/UserData'; // Import the UserData model

const router = express.Router();

// Create or update user data
router.post('/log', async (req: Request, res: Response) => {
  const { userId, caloriesIn, caloriesOut, height, weight, age, gender, bodyFatPercentage, fatGrams, proteinGrams, carbsGrams, goal, targetWeight, targetBodyFatPercentage } = req.body;

  try {
    // Check if data for the user already exists
    let userData = await UserData.findOne({ userId });

    if (userData) {
      // If data exists, update it
      userData.caloriesIn = caloriesIn;
      userData.caloriesOut = caloriesOut;
      userData.height = height;
      userData.weight = weight;
      userData.age = age;
      userData.gender = gender;
      userData.bodyFatPercentage = bodyFatPercentage;
      userData.fatGrams = fatGrams;
      userData.proteinGrams = proteinGrams;
      userData.carbsGrams = carbsGrams;
      userData.goal = goal;
      userData.targetWeight = targetWeight;
      userData.targetBodyFatPercentage = targetBodyFatPercentage;

      await userData.save();
      return res.status(200).json(userData);
    } else {
      // If no data exists, create a new entry
      const newUserData = new UserData({
        userId,
        caloriesIn,
        caloriesOut,
        height,
        weight,
        age,
        gender,
        bodyFatPercentage,
        fatGrams,
        proteinGrams,
        carbsGrams,
        goal,
        targetWeight,
        targetBodyFatPercentage,
      });

      await newUserData.save();
      res.status(201).json(newUserData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user data by userId
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const userData = await UserData.findOne({ userId: req.params.userId });

    if (!userData) {
      return res.status(404).json({ message: 'User data not found' });
    }

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
