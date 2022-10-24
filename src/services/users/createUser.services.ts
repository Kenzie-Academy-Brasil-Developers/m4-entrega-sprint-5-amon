import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const hashedPassword = await hash(password, 10);
  const userAlreadyExists = await userRepository.findOneBy({ email: email });
  if (userAlreadyExists) {
    throw new AppError("User already exists");
  }

  if (!password) {
    throw new AppError("Password is missing");
  }
  const user = await userRepository.create({
    name,
    email,
    isAdm,
    password: hashedPassword,
  });
  await userRepository.save(user);

  return user;
};

export default createUserService;
