import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import AppDataSource from "../../data-source";
import { ICategoryRequest } from "../../interfaces/categories/index";

const createCategoryService = async ({
  name,
}: ICategoryRequest): Promise<Categories> => {
  const categoryRepository = AppDataSource.getRepository(Categories);
  const categoryAlreadyExists = await categoryRepository.findOneBy({
    name: name,
  });

  if (categoryAlreadyExists) {
    throw new AppError("Category Already exists");
  }

  const category = categoryRepository.create({
    name,
  });

  await categoryRepository.save(category);

  return category;
};

export default createCategoryService;
