const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const slugify = require("slugify");
const {validateMongoDBId} = require('../utils/validateMongodbId.js')

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json({ newProduct });
  } catch (error) {
    throw new Error(error);
  }
});

const getProductById = asyncHandler(async (req, res) => {
  console.log(req.params);
  try {
    const findProduct = await Product.findById(req.params.id);
    if (!findProduct) throw new Error("Product not available for this Id");
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  const getAllProduct = await Product.find();
  console.log(getAllProduct);
  if (!getAllProduct) throw new Error("There is no product");

  res.send({
    data: getAllProduct,
    meta: {
      totalRecordFound: await Product.find().count(),
    },
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updateProduct);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req,res) => {
    const {id} = req.params
        validateMongoDBId(id)
    try{
        // const findProduct
    }
    catch(error) {
       throw new Error(error) 
    }
})

module.exports = {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct
};
