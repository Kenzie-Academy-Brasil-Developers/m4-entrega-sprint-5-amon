import createSchedulesService from "../services/shcedules/createSchedules.services";
import listPropertySchedulesService from "../services/shcedules/listPropertySchedules.services";
import { Request, Response } from "express";

const createSchedulesController = async (req: Request, res: Response) => {};

const listPropertySchedulesController = async (
  req: Request,
  res: Response
) => {};

export { listPropertySchedulesController, createSchedulesController };
