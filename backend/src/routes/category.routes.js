import { allcategoryList,categoryList, findCategoryProduct, getCategoriesWithProduct } from "../controllers/CategoryList.controller.js";

import express from "express";
const categoryRouter = express.Router();
categoryRouter.route("/all-category-list").get(allcategoryList); // Create a category list
categoryRouter.route("/categoryList").post(categoryList); // Create a category list
categoryRouter.route("/find-Category-Products").get(findCategoryProduct); //find Category Products
categoryRouter.route("/categories-with-product").get(getCategoriesWithProduct);


export default categoryRouter;  