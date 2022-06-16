import { PrismaClient } from '@prisma/client'
import cloudinary from 'cloudinary'

const prisma = new PrismaClient()

var imagem = ''
var resultado = ''

async function ProductRegister(req, res) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    cloudinary.uploader.upload(req.file.path, function (result, error) {
      imagem = result.secure_url
      resultado = result
      console.log(resultado)
    })

    await prisma.products.create({
      data: {
        title: req.body.title,
        image: imagem,
        description: req.body.description,
        price: req.body.price,
      },
    })

    return res.status(201).send({ message: 'Product Created with success!' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function getAll(rreq, res) {
  try {
    const product = await prisma.products.findMany()

    return res.status(201).send({ product })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!', error })
  }
}

async function getOne(req, res) {
  try {
    const product = await prisma.products.findUnique({
      where: { title: req.body.title },
    })

    return res.status(201).send({ product })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!', error })
  }
}

export default { ProductRegister, getAll, getOne }
