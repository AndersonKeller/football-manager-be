import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  iCreateLogin,
  iReturnLogin,
  returnUserSchema
} from "../../schemas/user.schemas";
import { compare } from "bcryptjs";
import { AppError } from "../../error";
import jwt from "jsonwebtoken";
import { translate } from "../../middlewares/language.middleware";
export const createLoginService = async (
  loginData: iCreateLogin
): Promise<iReturnLogin> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: loginData.email
    }
  });
  if (!user) {
    throw new AppError(translate("CREDENCIAIS_INVALIDAS"), 401);
  }
  const passwordMatch = await compare(loginData.password, user.password);
  if (!passwordMatch) {
    throw new AppError(translate("CREDENCIAIS_INVALIDAS"), 401);
  }
  const token: string = jwt.sign(
    {
      id: user.id
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id)
    }
  );
  const returnUser = returnUserSchema.parse(user);
  return { token: token, user: returnUser };
};
