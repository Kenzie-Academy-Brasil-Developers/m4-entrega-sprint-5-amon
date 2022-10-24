import { SchedulesProperties } from "../../entities/schedulesUserProperties.entity";
import { AppError } from "../../errors/appError";
import AppDataSource from "../../data-source";

const listPropertySchedulesService = async (
  idProperty: string
): Promise<SchedulesProperties> => {
  const schedulesRepository = AppDataSource.getRepository(SchedulesProperties);

  const schedules = await schedulesRepository.findOne({
    where: {
      id: idProperty,
    },
    relations: {
      property: true,
    },
  });

  if (!schedules) {
    throw new AppError("Schedule not found", 404);
  }

  return schedules;
};

export default listPropertySchedulesService;
