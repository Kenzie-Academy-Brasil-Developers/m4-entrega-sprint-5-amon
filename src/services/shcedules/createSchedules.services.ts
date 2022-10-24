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

  const schedulesAlreadyExists = await schedulesRepository.findOne({
    where: {
      date,
      hour,
    },
  });

  console.log(schedulesAlreadyExists);

  const property = await propertyRepository.findOneBy({
    id: propertyId,
  });

  console.log(property);

  if (!property) {
    throw new AppError("Invalid property id", 404);
  }

  if (schedulesAlreadyExists) {
    throw new AppError("User schedule already exists");
  }

  const hourSplit = hour.split(":");
  const realHour = Number(hourSplit[0]);

  if (realHour < 8) {
    throw new AppError("Invalid hour");
  }
  if (realHour >= 18) {
    throw new AppError("Invalid hour");
  }

  const dateSplit = date.split("/");
  const year = Number(dateSplit[0]);
  const month = Number(dateSplit[1]) - 1;
  const day = Number(dateSplit[2]);

  const realDate = new Date(year, month, day);

  const weekDay = realDate.getDay();

  if (weekDay === 6 || weekDay === 0) {
    throw new AppError("invalid date");
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
