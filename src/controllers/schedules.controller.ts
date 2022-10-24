import createSchedulesService from "../services/shcedules/createSchedules.services";
import listPropertySchedulesService from "../services/shcedules/listPropertySchedules.services";
import { IScheduleRequest } from "../interfaces/schedules";
import { Request, Response } from "express";

const createSchedulesController = async (req: Request, res: Response) => {
  const schedule: IScheduleRequest = req.body;
  const createdSchedule = await createSchedulesService(schedule);
  return res.status(201).json({ message: createdSchedule });
};

const listPropertySchedulesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedules = await listPropertySchedulesService(id);
  return res.status(200).json(schedules);
};

export { listPropertySchedulesController, createSchedulesController };
