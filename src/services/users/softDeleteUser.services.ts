import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const softDeleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });
  if (!user) {
    throw new AppError("User not found!", 404);
  }

  if (!user.isActive) {
    throw new AppError("User already soft deleted");
  }

  await userRepository.update(id, {
    isActive: false,
  });
};

export default softDeleteUserService;
