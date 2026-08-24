import { Request, Response } from "express";
import Recommendation from "../models/Recommendation.js";

// Excluded rather than allow-listed, so a field added later is not silently
// dropped from the payload — the mistake `category` ran into on skills.
const HIDDEN_FIELDS = "-createdAt -updatedAt -__v";

class RecommendationsService {
  async createRecommendation(req: Request, res: Response) {
    try {
      await Recommendation.create(req.body);
      res.status(201).json({
        message: "Recommendation created successfully",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateRecommendation(req: Request, res: Response) {
    try {
      // `runValidators` is off by default on an update, which would let a bad
      // `relation` through on edit even though create rejects it.
      await Recommendation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        message: "Recommendation updated successfully",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteRecommendation(req: Request, res: Response) {
    try {
      await Recommendation.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Recommendation deleted successfully",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getRecommendationById(req: Request, res: Response) {
    try {
      const recommendation = await Recommendation.findById(
        req.params.id
      ).select(HIDDEN_FIELDS);
      res.status(200).json({
        recommendation: recommendation,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllRecommendations(req: Request, res: Response) {
    try {
      // Manual position wins, then featured, then newest. Everything left at
      // the default order ties, so the old featured-then-newest behaviour is
      // exactly what an unordered collection still gets.
      const recommendations = await Recommendation.find()
        .select(HIDDEN_FIELDS)
        .sort({ order: 1, featured: -1, date: -1 });

      res.status(200).json({
        message: "Recommendations retrieved successfully",
        recommendations: recommendations,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const recommendationsService = new RecommendationsService();
