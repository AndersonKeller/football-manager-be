import { Router } from "express";
import { nationalityController } from "../controllers/nationality.controllers";

export const nationalityRoutes: Router = Router();

nationalityRoutes.post("", nationalityController.createNationality);
nationalityRoutes.get("", nationalityController.getAllNationality);
