import { Category } from "../models/Category.model.js";
import { Product } from "../models/Product.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const allcategoryList=asyncHandler(async(req,res)=>{
   const categoriesWithProducts = await Category.aggregate([
  {
    $lookup: {
      from: "products", // name of your Product collection
      localField: "_id",
      foreignField: "category",
      as: "products"
    }
  },
  { $match: { "products.0": { $exists: true } } },
  { $project: { products: 0 } } 
]);

    res.status(200).json(
        new ApiResponse(200,categoriesWithProducts,"all category list")
    )
})

const categoryList = asyncHandler(async (req, res) => {
  const { categoryName } = req.query;
console.log('categoryName in categoryList',categoryName)
  if (!categoryName) {
    throw new ApiError(400, "field is required");
  }

  const names = Array.isArray(categoryName) ? categoryName : [categoryName];
console.log('name',names)
  const categories = await Category.find({
    categoryName: { $in: names }
  });
  if (categories.length === 0) {
    throw new ApiError(400, "no matching category");
  }

  const ids = categories.map(c => c.id);

  const products = await Product.find({
    category: { $in: ids }
  }).populate("category", "categoryName");

  res.status(200).json(
    new ApiResponse(200, products, "search category result")
  );
});

const findCategoryProduct=asyncHandler(async(req,res)=>{
    const categoryName=req.query.category
    if (!categoryName) {
        throw new ApiError(401,"catogoryName name is required! ")
    }
  const names = Array.isArray(categoryName) ? categoryName : [categoryName];

    const categories = await Category.find({
    categoryName: { $in: names }
  });
  if (categories.length === 0) {
    throw new ApiError(400, "no matching category");
  }
   const ids = categories.map(c => c.id);

  const findCategoryProducts = await Product.find({
    category: { $in: ids }
  }).populate("category", "categoryName");
    
    if (findCategoryProducts.length === 0) {
        throw new ApiError(404,"product not found with this category")
        
    }
    res.status(200).json(new ApiResponse(200,findCategoryProducts,'find product successfully'))

})


const getCategoriesWithProduct = asyncHandler(async (req, res) => {
    // Get all unique categories
    const categories = await Product.distinct("category");
    if (!categories || categories.length === 0) {
        throw ApiError(404,"No categories found" );
        
    }

    // Fetch one product per category
    const result = await Promise.all(
        categories.map(async (cat) => {
            const product = 
            await Product.findOne({ category: cat })
            .lean()
            .populate("category","categoryName");
            return product ;
            
        })
    );

    res.status(200).json(new ApiResponse(200,result)  );
});

;

export {
    categoryList,
    allcategoryList,
    findCategoryProduct,
     getCategoriesWithProduct
}