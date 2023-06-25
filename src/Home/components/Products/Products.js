import React from 'react'
import './Products.css';
import { useFilterContext } from '../../../context/filter_context';
import ProductList from '../ProductList/ProductList';
import SearchSort from '../SearchSort/SearchSort';

const Products = () => {
  const {filter_products} = useFilterContext();
  let products = filter_products;
  return (
    <div className='products-container'>
      <div className='product-head'>
      <SearchSort />
      <p className='count-label'>Total Products: <span className='count-val'>{products.length}</span> </p>
      </div>
      {products.length >=0 &&
      <section className='products'>
        { products.map((product, index) => {
          return <ProductList key={index} product={product} />
        })}
      </section>
       }
      {products.length === 0 && <div className='no-data'>No data available</div>}
    </div>
  )
}

export default Products