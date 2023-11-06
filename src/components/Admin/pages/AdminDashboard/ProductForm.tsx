import { ChangeEvent, FormEvent } from 'react'
import { Product } from '../../../../redux/slices/products/productSlice'

import { toast } from 'react-toastify'

type ProductFormProps = {
  product: Product
  handleSubmit: (e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function ProductForm({ product, handleSubmit, handleChange }: ProductFormProps) {

  const inputStyle = 'w-100 px-3 py-2  border rounded-lg focus:outline-none focus:border-blue-400'
  const labelStyle = 'd-block mb-1 text-sm font-medium text-gray-600 dark:text-gray-200'

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg  ">
      <div className="mb-4">
        <label htmlFor="name" className={labelStyle}>
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={product.name}
          onChange={handleChange}
          className={inputStyle}
          onBlur={(e) => {
            const { value } = e.target
            if (value.length < 3) {
              toast.error('Name must be at least 3 characters long', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true
              })
              return
            }
          }}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className={labelStyle}>
          Image URL:
        </label>
        <input
          type="text"
          name="image"
          id="image"
          value={product.image}
          onChange={handleChange}
          className={inputStyle}
          onBlur={(e) => {
            const { value } = e.target
            if (!value.startsWith('https://')) {
              toast.error('Image URL must start with https://', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true
              })
              return
            }
          }}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className={labelStyle}>
          Description:
        </label>
        <textarea
          name="description"
          id="description"
          value={product.description}
          onChange={handleChange}
          className={inputStyle}
          onBlur={(e) => {
            const { value } = e.target
            if (value.length < 10) {
              toast.error('Description must be at least 10 characters long', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true
              })
              return
            }
          }}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="categories" className={labelStyle}>
          Categories: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="categories"
          id="categories"
          value={product.categories.join(',')}
          onChange={handleChange}
          className={inputStyle}
          onBlur={(e) => {
            const { value } = e.target
            if (!value.endsWith('s')) {
              toast.error('Categories must be plural', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true
              })
              return
            }
          }}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="variants" className={labelStyle}>
          Variants: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="variants"
          id="variants"
          value={product.variants.join(',')}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sizes" className={labelStyle}>
          Sizes: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="sizes"
          id="sizes"
          value={product.sizes.join(',')}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className={labelStyle}>
          Price:
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={product.price}
          onChange={handleChange}
          className={inputStyle}
          onBlur={(e) => {
            const { value } = e.target
            if (+value < 0) {
              toast.error('Price must be a positive number', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true
              })
              return
            }
          }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className={labelStyle}>
          Rating:
        </label>
        <input
          type="number"
          name="rating"
          id="rating"
          value={product.rating}
          onChange={handleChange}
          className={inputStyle}
          onBlur={(e) => {
            const { value } = e.target
            if (+value < 0 || +value > 5) {
              toast.error('Rating must be between 0 and 5', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true
              })
              return
            }
          }}
        />
      </div>
      <div className="w-100 d-flex justify-content-center">
        <button type="submit" className=" btn btn-outline-light border fw-bold px-4 py-2">
          Add Product
        </button>
      </div>
    </form>
  )
}
