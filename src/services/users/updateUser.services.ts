import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";
import { AppError } from "../../errors/appError";
import { hash } from "bcrypt";

const updateUserService = async (
  { name, email, password, isAdm, isActive }: IUserUpdate,
  id: string,
  bodyId: string
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });

  if (isAdm !== undefined || isActive !== undefined || bodyId !== undefined) {
    throw new AppError("Cannot update isAdm, isActive or Id properties", 401);
  }

  if (!user) {
    throw new AppError("user not found!", 404);
  }

  await userRepository.update(id, {
    name: name ? name : user.name,
    email: email ? email : user.email,
    password: password ? await hash(password, 10) : user.password,
  });

  const updatedUser = await userRepository.findOneBy({
    id,
  });

  return updatedUser!;
};

export default updateUserService;
