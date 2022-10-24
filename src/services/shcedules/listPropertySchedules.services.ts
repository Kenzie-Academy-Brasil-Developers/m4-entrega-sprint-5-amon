import { SchedulesProperties } from "../../entities/schedulesUserProperties.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import AppDataSource from "../../data-source";

const listPropertySchedulesService = async (
  idProperty: string
): Promise<Properties> => {
  console.log(idProperty);

  const propertiesRepository = AppDataSource.getRepository(Properties);
  const properties = await propertiesRepository.findOne({
    where: {
      id: idProperty,
    },
    relations: {
      schedules: true,
    },
  });

  if (!properties) {
    throw new AppError("Schedule not found", 404);
  }

  return properties;
};

export default listPropertySchedulesService;
