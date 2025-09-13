import { Repository } from "typeorm";
import {
  iCreateUser,
  iReturnUser,
  returnUserSchema
} from "../../schemas/user.schemas";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";
export const createUserService = async (
  userData: iCreateUser
): Promise<iReturnUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository.findOne({
    where: {
      email: userData.email
    }
  });
  if (findUser) {
    throw new AppError(translate("UNIQUE_EMAIL"), 409);
  }
  const createUser = userRepository.create(userData);
  await userRepository.save(createUser);

  const user = returnUserSchema.parse(createUser);
  return user;
};
