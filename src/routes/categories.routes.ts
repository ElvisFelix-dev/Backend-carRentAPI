import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '../modules/cars/UseCases/createCategory/createCategoryController'
import { ImportCategoryController } from '../modules/cars/UseCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '../modules/cars/UseCases/listCategories/ListCategoriesController'

const categoriesRoutes = Router()
const upload = multer({dest: './tmp'})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoryController = new ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategoryController.handle)

categoriesRoutes.post('/import', upload.single("file"), importCategoryController.handle)

export { categoriesRoutes }
