import createCategoryService from "../services/categories/createCategory.services";
import listCategoriesService from "../services/categories/listCategories.services";
import listPropertiesInCategoryService from "../services/categories/listPropertiesInCategory.services";
import { ICategoryRequest } from "../interfaces/categories";
import { Request, Response } from "express";

const createCategoryController = async (req: Request, res: Response) => {
  const category: ICategoryRequest = req.body;
  const createdCategory = await createCategoryService(category);
  return res.status(201).json(createdCategory);
};

const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();
  return res.status(200).json(categories);
};

const listPropertiesInCategoryController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const category = await listPropertiesInCategoryService(id);
  return res.status(200).json(category);
};

export {
  createCategoryController,
  listCategoriesController,
  listPropertiesInCategoryController,
};
