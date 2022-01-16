import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { CreateCategoryController } from './createCategoryController'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export default (): CreateCategoryController => {
  console.log("Category")
  const categoriesRepository =  new CategoriesRepository()

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

  const createCategoryController = new CreateCategoryController(createCategoryUseCase)

  return createCategoryController
}


