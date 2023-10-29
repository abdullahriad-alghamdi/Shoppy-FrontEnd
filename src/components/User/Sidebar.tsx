import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchCategories } from '../../redux/slices/categories/categorySlice'

const Sidebar = () => {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <>
      <aside className="filterSideBar">
        <span className="filterReset filterResetPromo">Reset Filter</span>

        <section className="filter">
          <div className="labelFilter">
            <h3>Categories</h3>
          </div>

          <div className="AreaDataFilter">
            {!error && isLoading ? (
              <h3> Loading categories...</h3>
            ) : categories.length > 1 ? (
              categories.map((category) => (
                <div key={category.id} className="DataFilter">
                  <input type="checkbox" />
                  <span>{category.name}</span>
                </div>
              ))
            ) : (
              <h3> {error} </h3>
            )}
          </div>
        </section>
      </aside>
    </>
  )
}

export default Sidebar
