import AppDataSource from "../../data-source";
import { IPropertyRequest } from "../../interfaces/properties/index";
import { Properties } from "../../entities/properties.entity";
import { Addresses } from "../../entities/addresses.entity";
import { AppError } from "../../errors/appError";
import { Categories } from "../../entities/categories.entity";

const createPropertyService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest): Promise<Properties> => {
  const addressRepository = AppDataSource.getRepository(Addresses);
  const propertyRepository = AppDataSource.getRepository(Properties);
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const filteredAddress = await addressRepository.findOne({
    where: {
      zipCode: address.zipCode,
    },
  });

  if (filteredAddress) {
    throw new AppError("Address already exists");
  }

  const categories = await categoriesRepository.findOneBy({
    id: categoryId,
  });

  if (!categories) {
    throw new AppError("Category not found", 404);
  }

  if (address.zipCode.length > 8) {
    throw new AppError("Zip Code cannot have more than 8 digits");
  }

  if (address.state.length > 2) {
    throw new AppError("State cannot have more than 2 digits");
  }

  const newAddress = addressRepository.create({
    district: address.district,
    zipCode: address.zipCode,
    number: address.number,
    city: address.city,
    state: address.state,
  });

  await addressRepository.save(newAddress);

  const property = propertyRepository.create({
    value,
    size,
    address: newAddress,
    category: categories!,
  });

  await propertyRepository.save(property);

  return property;
};

export default createPropertyService;
