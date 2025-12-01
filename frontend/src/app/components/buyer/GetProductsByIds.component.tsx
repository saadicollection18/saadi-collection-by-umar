import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProductInterface } from "../../utils/productsInterface";
import ProductReviewFormComponent from "./ProductReviewForm.component";
import ReviewComponent from "./Review.component";

const GetProductsByIdsComponent = ({ productIds }: { productIds: string[] | [] }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const searchParams = useSearchParams();
  const router = useRouter();
  const decoded = searchParams.get('query') && JSON.parse(atob(searchParams.get('query') || ''))
  const idsAndQuantityArr = decoded && decoded.productIds || [];
  const queryProductIds = idsAndQuantityArr || [];
  const [product, setProduct] = useState<ProductInterface[]>([]);
  const [countReviews, setCountReviews] = useState<{ [key: string]: number }>({});
  const [openId, setOpenId] = useState<string | null>(null)
  const pathName = usePathname();
  const productReviewShowingRoutes = ["/buyer/order", "/buyer/payment-cashier"].includes(pathName)




  const getProductsByIds = async () => {

    try {
      const res = await axios.post(`${API_URL}/getProductsByIds`, {
        productIdsArr: queryProductIds && queryProductIds.length !== 0 ? queryProductIds : productIds,
      });
      setProduct(res.data.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          alert("Product not found, it may have been removed.");
          router.back();
          return;
        }
      }
    }
  };

  useEffect(() => {


    getProductsByIds();
  }, []);

  return (
    (
      product &&
      product.map((products: ProductInterface) => {
        const hasDiscount = products.discount && products.discount > 0;
        const isOutOfStock = products.countInStock <= 0;

        return (
          <div key={products._id} className="w-full">

  <div className="flex flex-col md:flex-row md:p-4 gap-6">

    <div className="w-full bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row gap-6">

      <div className="relative flex flex-col items-center gap-4 w-full md:w-auto">

        {hasDiscount && (
          <div className="absolute top-2 left-2 z-20">
            <div className="bg-red-600 text-white font-bold px-3 py-1 rounded-lg shadow">
              <span className="text-sm">
                {Math.round((Number(products.discount) / Number(products.price)) * 100)}% OFF
              </span>
            </div>
          </div>
        )}

        {products.image ? (
          <div className="relative w-full max-w-xs md:max-w-sm overflow-hidden rounded-xl shadow-md group">
            <Image
              src={products.image}
              alt={products.title}
              onClick={() => window.open(products.image, "_blank")}
              className="rounded-xl w-full h-auto object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
              width={400}
              height={400}
            />
          </div>
        ) : (
          <div className="w-60 h-60 flex items-center justify-center bg-gray-100 text-gray-500 rounded-xl border-2 border-dashed">
            No Image
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-4">

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {products.title || "Untitled Product"}
          </h1>

          <div className="flex items-center gap-4 flex-wrap">
            {hasDiscount ? (
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl font-bold text-green-600">
                  PKR {Number(products.price) - Number(products.discount)}
                </span>
                <span className="text-gray-500 line-through">
                  PKR {products.price?.toFixed(2)}
                </span>
                <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded-full">
                  Save {Math.round((Number(products.discount) / Number(products.price)) * 100)}%
                </span>
              </div>
            ) : (
              <span className="text-xl md:text-2xl font-bold text-green-600">
                PKR {products.price?.toFixed(2) || "N/A"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-700">Brand:</span>
            <span className="text-lg text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
              {products.brand || "Unknown"}
            </span>
          </div>
        </div>

        <div>
          <h1 className="font-semibold text-gray-700">Description:</h1>

          <p
            onClick={() => setOpenId(openId === products._id ? null : products._id)}
            className={
              openId === products._id
                ? "text-gray-700 break-all"
                : "text-gray-700 break-all line-clamp-3"
            }
          >
            {products.description || "No description available."}
          </p>

          <button
            onClick={() => setOpenId(openId === products._id ? null : products._id)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 mt-1"
          >
            {openId === products._id ? "Show less" : "Show more"}
          </button>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={`text-xl ${index < Math.round(countReviews[products._id] || 0) ? "text-amber-400" : "text-gray-300"}`}
              >
                {index < Math.round(countReviews[products._id] || 0) ? "★" : "☆"}
              </span>
            ))}
          </div>

          <Link
            href="#review"
            scroll={true}
            className="text-gray-700 underline"
          >
            {countReviews[products._id] || "No"} ratings
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">

          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${isOutOfStock ? "bg-rose-500" : "bg-emerald-500"}`}></div>
            <span className={`text-sm font-medium ${isOutOfStock ? "text-rose-600" : "text-emerald-600"}`}>
              {isOutOfStock ? "Out of Stock" : `${products.countInStock} Available`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              Free Shipping Available
            </span>
          </div>
        </div>
      </div>
    </div>

    {productReviewShowingRoutes && (
      <div id="review" className="w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
          <ReviewComponent setCountReviews={setCountReviews} productId={products._id} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
          <ProductReviewFormComponent productId={products._id} />
        </div>
      </div>
    )}
  </div>

  <hr className="border-dashed border-gray-300 my-8" />

</div>

        );
      })
    )
  );
};

export default GetProductsByIdsComponent;
