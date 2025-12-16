import express from "express";
import { authMiddleWare, authorizeRole } from "../middlewares/authMiddlewares.js";
import { createReview, getAllReviews, getLatestReviews, getTrainerReviews } from "../controllers/reviewController.js";



const reviewRouter = express.Router();

reviewRouter.use(authMiddleWare);
reviewRouter.post("/create",authorizeRole(["client"]), createReview);
reviewRouter.get("/trainer",authorizeRole(["trainer"]), getTrainerReviews);
reviewRouter.get("/latest",authorizeRole(["admin"]), getLatestReviews);
reviewRouter.get("/all",authorizeRole(["admin"]), getAllReviews);

export default reviewRouter;