import { MouseEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { fetchCategories } from '../../redux/slices/categories/categorySlice'
import { fetchProducts, filterProducts } from '../../redux/slices/products/productSlice'
import { Button, Spinner } from 'react-bootstrap'

const FilterBar = () => {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories)

  const dispatch: AppDispatch = useDispatch()

  const filterHandle = (e: MouseEvent<HTMLButtonElement>, id: number | string) => {
    e.preventDefault()
    let categoryId = id
    dispatch(fetchProducts()).then(() => dispatch(filterProducts(categoryId)))
    if (id === 'all') {
      e.currentTarget.classList.add('active')
    } else {
      const buttons = document.querySelectorAll('button')
      buttons.forEach((button) => {
        button.classList.remove('active')
      })
      e.currentTarget.classList.add('active')
    }
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
          <Button value="all" variant="outline-dark  " onClick={(e) => filterHandle(e, 'all')}>
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline-dark"
              value={category.id}
              onClick={(e) => filterHandle(e, category.id)}>
              {category.name}
            </Button>
          ))}
        </section>
      </aside>
    </>
  )
}

export default FilterBar
