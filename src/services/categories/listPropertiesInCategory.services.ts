import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import AppDataSource from "../../data-source";

const listPropertiesInCategoryService = async (
  idCategory: string
): Promise<Categories> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categories = await categoriesRepository.findOne({
    where: {
      id: idCategory,
    },
    relations: {
      properties: true,
    },
  });

  if (!categories) {
    throw new AppError("Category not found", 404);
  }

  return categories;
};

export default listPropertiesInCategoryService;
