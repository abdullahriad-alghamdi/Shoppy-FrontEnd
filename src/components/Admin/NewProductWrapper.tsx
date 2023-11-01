import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { ProductForm } from './ProductForm'
import { addProduct, Product } from '../../redux/slices/Products/productSlice'
import { AppDispatch } from '../../redux/store'

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
    rating: 0
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
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Send the product data to your backend or in this case send it to Redux
    console.log('New product data:', product)
    // let's add Id property to the object (usually IDs are generated automatically on the backend)
    product.id = +new Date()
    console.log('product:', product)

    dispatch(addProduct({ product }))
    // Reset the form
    setProduct(initialProductState)
    // Navigate to the products page in the admin dashboard
    navigate('/dashboard/admin/products')
  }

  return (
    <div>
      <h3 className="text-2xl font-bold">Add a new product</h3>
      <ProductForm handleSubmit={handleSubmit} handleChange={handleChange} product={product} />
    </div>
  )
}
