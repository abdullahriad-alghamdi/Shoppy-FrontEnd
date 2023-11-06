import { MouseEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../src/redux/store'

import { fetchProducts, filterProducts } from '../../../../src/redux/slices/Products/productSlice'

import { Button, Spinner } from 'react-bootstrap'

const FilterBar = () => {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories)
  const [activeCategory, setActiveCategory] = useState<string | number>('all')

  const dispatch: AppDispatch = useDispatch()

  const filterHandle = (e: MouseEvent<HTMLButtonElement>, id: number | string) => {
    e.preventDefault()
    setActiveCategory(id)
    dispatch(fetchProducts()).then(() => dispatch(filterProducts(id)))
  }

  if (isLoading) {
    return (
      <h2 className="loading">
        <Spinner animation="grow" variant="warning" />
      </h2>
    )
  }

  if (error) {
    return <h2 className="loading">{error}</h2>
  }
  return (
    <>
      <aside className="filter-sidebar">
        <section className="col d-flex align-items-center justify-content-center flex-wrap gap-2">
          <Button
            variant="outline-dark  "
            className={` ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={(e) => filterHandle(e, 'all')}>
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline-dark"
              value={category.id}
              onClick={(e) => filterHandle(e, category.id)}
              className={` ${activeCategory === category.id ? 'active' : ''}`}>
              {category.name}
            </Button>
          ))}
        </section>
      </aside>
    </>
  )
}

export default FilterBar
