import { SystemChallenges } from "../models/SystemChallenges.model.js";
import systemChallenges from "../assets/systemChallenges.json" assert { type: "json" };

export const seedSystemChallenges = async () => {
  try {
    const challengesCounter = await SystemChallenges.count();
    if (challengesCounter === 0) {
      await SystemChallenges.insertMany(systemChallenges.challenges, {
        upsert: true,
      });
    }
  } catch (err) {
    console.error(err);
  }

  console.log("System defined challenges are seeded from seed script.");
};
