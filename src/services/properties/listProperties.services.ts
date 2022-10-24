import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

const listPropertiesService = async (): Promise<Properties[]> => {
  const propertyRepository = AppDataSource.getRepository(Properties);

  const listedProperties = await propertyRepository.find();

  return listedProperties;
};

export default listPropertiesService;
