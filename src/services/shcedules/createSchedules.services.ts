import AppDataSource from "../../data-source";
import { IScheduleRequest } from "../../interfaces/schedules";
import { Properties } from "../../entities/properties.entity";
import { SchedulesProperties } from "../../entities/schedulesUserProperties.entity";
import { AppError } from "../../errors/appError";

const createSchedulesService = async ({
  date,
  hour,
  propertyId,
}: IScheduleRequest) => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const schedulesRepository = AppDataSource.getRepository(SchedulesProperties);

  const property = await propertyRepository.findOneBy({
    id: propertyId,
  });

  if (!property) {
    throw new AppError("Invalid property id", 404);
  }

  const confirmDate = new Date();

  if (hour.length < 8) {
    throw new AppError("Invalid hour");
  }
  if (hour.length > 18) {
    throw new AppError("Invalid hour");
  }

  const newSchedule = schedulesRepository.create({
    date,
    hour,
    property: property,
  });

  await schedulesRepository.save(newSchedule);

  return newSchedule;
};

export default createSchedulesService;
