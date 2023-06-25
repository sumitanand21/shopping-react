import React from 'react'
import './Category.css';
import { useFilterContext } from '../../../context/filter_context';

const Category = ({ categories }) => {
  const {filters: { category,minPrice, price, maxPrice }, updateFilterValue,clearFilters } = useFilterContext();


  return (
    <div className='category-container'>
      <section className='header-wrap'>
        <h3 className='title-heading'>Arch</h3>
      </section>
      <section className='category'>
        <button key="all"  
        type='button' 
        name="category" 
        className={category === "all" ? "category-title-button active" : "category-title-button"}
        value="all" 
        onClick={updateFilterValue}> All Categories</button>
        <div className='category-item'>
          {categories.map((categoryObj,index) => {
            return  <button key={index} 
            type='button' 
            name="category" 
            className={category === categoryObj.id ? "category-button active" : "category-button"}
            value={categoryObj.id}
            onClick={updateFilterValue}>{categoryObj.name}</button>
          })}
        </div>

      </section>
      <section className='price-range'>
        <label className='price-label'>Price: <span>$ {price}</span></label>
        <input type="range" className="range-inp" name="price" min={minPrice} max={maxPrice} value={price}  onChange={updateFilterValue} />
      </section>
      <section className="filter-clear">
        <button type="button" className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </section>
    </div>
  )
}

export default Category