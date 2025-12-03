'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { ProductInterface } from '../utils/productsInterface'
import axios from 'axios'


const Slider: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
   
  



    const categoryBaseProducts = async () => {
      
      try {
        const res = await axios.get(`${API_URL}/categories-with-product`);
        const data=res.data.data
      
        setProducts(data);
      } catch  {
        alert('somthing went wrong while fetching categories products ')
      }
    };

useEffect(()=>{
categoryBaseProducts()
},[])

const router=useRouter()
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [ [products.length]])

  const next = () => setIndex((prev) => (prev + 1) % products.length)
  const prev = () => setIndex((prev) => (prev - 1 + products.length) % products.length)

  return (
    <div className="relative w-full  h-[70vh] max-h-[600px] overflow-hidden rounded-2xl">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {products.map((slide, i) =>{ 
         
       return (
         <div
  key={i}
  className="min-w-full h-[70vh] relative flex items-center justify-center "
  style={{ backgroundImage: `url(${slide.image})` }}
>
            <img
              src={slide.image}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-3 text-center px-6">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4">
                {slide.title}
              </h2>     

                  <button
              onClick={()=>{
                      router.push(`/?category=${slide.category.categoryName }#products`)

              }}
               className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition">
               category: {slide.category.categoryName}
              </button>   
            
              <button
              onClick={()=>{
                      router.push(`/buyer/order?query=${btoa(JSON.stringify({ productId:slide._id }))}`)

              }}
               className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition">
                Shop Now
              </button>
             
          
            </div>
          </div>
        )
        }
        )}
      </div>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 text-gray-900 p-2 rounded-full hover:bg-opacity-100"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 text-gray-900 p-2 rounded-full hover:bg-opacity-100"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === i ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
