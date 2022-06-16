import { Router } from 'express'
import multer from 'multer'
import productController from './controllers/productController'

import uploadConfig from './config/uploadConfig'

const upload = multer(uploadConfig)

const route = Router()

route.get('/', productController.getAll)
route.get('/getOne', productController.getOne)
route.post('/reg', upload.single('image'), productController.ProductRegister)

export default route
