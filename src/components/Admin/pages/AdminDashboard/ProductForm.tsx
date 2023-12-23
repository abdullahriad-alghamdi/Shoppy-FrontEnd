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
    <section
      className="container d-flex flex-column  align-items-left gap-3 "
      style={{ width: '500px', margin: 'auto', marginBottom: '50px', height: '100%' }}>
      {isEdit && (
        <form className="container col-6 bg-light p-3 col-12">
          <h2 className="text-center">Add Product</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              // value={updatedProduct.title}
              // onChange={(e) =>
              //   setUpdatedProduct({ ...updatedProduct, title: e.target.value })
              // }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              // value={updatedProduct.description}
              // onChange={(e) =>
              //   setUpdatedProduct({ ...updatedProduct, description: e.target.value })
              // }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              // value={updatedProduct.price}
              // onChange={(e) =>
              //   setUpdatedProduct({ ...updatedProduct, price: +e.target.value })
              // }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="text"
              className="form-control"
              id="image"
              // value={updatedProduct.image}
              // onChange={(e) =>
              //   setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              // }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              // value={updatedProduct.category}
              // onChange={(e) =>
              //   setUpdatedProduct({ ...updatedProduct, category: e.target.value })
              // }
            >
              <option defaultValue={0}>Choose...</option>
              {categories.map((category: Category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              // value={updatedProduct.quantity}
              // onChange={(e) =>
              //   setUpdatedProduct({ ...updatedProduct, quantity: +e.target.value })
              // }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="countInStock" className="form-label">
              CountInStock
            </label>
            <input
              type="number"
              className="form-control"
              id="countInStock"
              // value={updatedProduct.countInStock}
              // onChange={(e) =>
              //   setUpdatedProduct({ ...updatedProduct, countInStock: +e.target.value })
              // }
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            // onClick={() => {
            //   dispatch(updateProduct(selectedId, updatedProduct))
            //   toast.success('Product updated successfully')
            // }}
          >
            Update
          </button>
        </form>
      )}
    </section>
  )
}
