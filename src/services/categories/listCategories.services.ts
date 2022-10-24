import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";

const listCategoriesService = async (): Promise<Categories[]> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const listedCategories = await categoryRepository.find();

  return listedCategories;
};

export default listCategoriesService;
