import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensure-data-is-valid.middleware";
import {
  createStadiumAreaSchema,
  createStadiumSchema
} from "../schemas/stadium.schemas";
import { stadiumController } from "../controllers/stadium.controllers";

export const stadiumRoutes: Router = Router();

stadiumRoutes.post(
  "/area",
  ensureDataIsValidMiddleware(createStadiumAreaSchema),
  stadiumController.createStadiumArea
);
stadiumRoutes.post(
  "",
  ensureDataIsValidMiddleware(createStadiumSchema),
  stadiumController.createStadium
);
stadiumRoutes.get("", stadiumController.getAllStadiums);
stadiumRoutes.get("/area", stadiumController.getAllStadiumAreas);
stadiumRoutes.get("/:id", stadiumController.getStadiumById);
