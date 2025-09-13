import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Nationality } from "../entities";
import { AppError } from "../error";

export const ensureNationalityIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const nationalityRepository: Repository<Nationality> =
    AppDataSource.getRepository(Nationality);
  const findNationality: Nationality | null =
    await nationalityRepository.findOne({
      where: {
        id: req.body.nationality.id
      }
    });
  if (!findNationality) {
    throw new AppError("Nationality not found", 404);
  }
  req.body.nationality = findNationality;
  next();
};
