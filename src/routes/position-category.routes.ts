import { Router } from "express";
import { positionCategoryController } from "../controllers/position-category.controllers";

export const positionCategoryRoutes: Router = Router();

positionCategoryRoutes.get(
  "",
  positionCategoryController.getAllPositionCategory
);
