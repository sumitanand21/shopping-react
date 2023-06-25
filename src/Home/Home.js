import React from 'react'
import Category from './components/Category/Category'
import Products from './components/Products/Products'
import './Home.css';
import { useProductContext } from '../context/productcontext';

const Home = () => {
  const { categories } = useProductContext();
  return (
    <div className="container-home">
      <section className='category-wrap'>
            <Category categories={categories}/>
      </section>
      <section className='products-wrap'>
         <Products />
      </section>
    </div>
  )
}

export default Home
