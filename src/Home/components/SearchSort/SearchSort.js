import React from 'react'
import './SearchSort.css';
import { useFilterContext } from '../../../context/filter_context';

const SearchSort = () => {
  const { sorting_value, filters : {searchVal, category}, sorting, updateFilterValue } = useFilterContext();
  let selectState = sorting_value;
  let textVal = searchVal;
  return (
    <section className='products-header'>
    <select name="sort" id="sort" className='sort-selection'value={selectState} onChange={sorting}>
      <option value="lowest">Price(lowest)</option>
      <option value="highest">Price(highest)</option>
      <option value="a-z">Product(a-z)</option>
      <option value="z-a">Product(z-a)</option>
      <option value="discount" hidden={category !== 'all'} disabled={category !== 'all'}>Discount(%)</option>
    </select>
    <input type="text" autoComplete='off' className="search-filter" placeholder="Search" value={textVal} name="searchVal" onChange={updateFilterValue}/>
  </section>
  )
}

export default SearchSort