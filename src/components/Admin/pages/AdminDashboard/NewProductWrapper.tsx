import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../redux/store'
import { addProduct, Product } from '../../../../redux/slices/products/productSlice'

import { ProductForm } from './ProductForm'

export function NewProductWrapper() {

  const navigate = useNavigate()

  const initialProductState: Product = {
    id: 0,
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: [],
    price: 0,
    rating: 0,
    quantity: 0
  }

  const dispatch = useDispatch<AppDispatch>()

  const [product, setProduct] = useState<Product>(initialProductState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }

    setProduct({
      ...product,
      [name]: value
    })

    // to update the product state
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(addProduct({ product }))
    setProduct(initialProductState)
    navigate('/dashboard/admin/products')



  }

  return (
    <section className="container d-flex flex-column border rounded p-4 mt-5 bg-dark text-white w-50 mx-auto">
      <h2 className=" text-center mb-4">Add a new product</h2>
      <ProductForm handleSubmit={handleSubmit} handleChange={handleChange} product={product} />
    </section>
  )
}
