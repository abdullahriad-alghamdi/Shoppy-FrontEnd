import { MouseEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../src/redux/store'

import {
  fetchAllProducts,
  fetchProducts,
  fetchProductsByCategory
} from '../../../redux/slices/products/productSlice'

import { Button } from 'react-bootstrap'

const FilterBar = () => {
  const { categories, error } = useSelector((state: RootState) => state.categories)
  const [activeCategory, setActiveCategory] = useState<string | number>('all')
  const dispatch: AppDispatch = useDispatch()

  const filterHandle = (e: React.MouseEvent, categoryID: string) => {
    if (categoryID === 'all') {
      dispatch(fetchAllProducts())
      setActiveCategory('all')
    } else {
      const sentToPagination = {
        page: 1,
        limit: 4,
        sortValue: '',
        searchTerm: '',
        categoryID: categoryID
      }
      setActiveCategory(categoryID)
      dispatch(fetchProducts(sentToPagination))
    }
  }

  // filter products by categoryID fetchProductsByCategory

  if (error) {
    return <h2 className="loading">{error}</h2>
  }
  return (
    <>
      <aside className="filter-sidebar">
        <section className="col d-flex align-items-center justify-content-center flex-wrap gap-2">
          {
            <Button
              variant="outline-dark  "
              className={` ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={(e) => filterHandle(e, 'all')}>
              All
            </Button>
          }
          {categories.map((category) => (
            <Button
              key={category._id}
              variant="outline-dark"
              value={category._id}
              onClick={(e) => filterHandle(e, category._id)}
              className={` ${activeCategory === category._id ? 'active' : ''}`}>
              {category.title}
            </Button>
          ))}
        </section>
      </aside>
    </>
  )
}

export default FilterBar
