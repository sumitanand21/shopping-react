import React from 'react';
import './ProductList.css';
import { useFilterContext } from '../../../context/filter_context';

const ProductList = ({product}) => {
    const { onQuantityChange } = useFilterContext();
  return (
    <div className='product-items'>
    <h1 className='product-title'>{product.title}</h1>
    <div className='buy-details'>
        <figure className='img-wrap'>
          <img
            className="img-content" 
            src={product.imgUrl}
            alt="error-img"
          />
        </figure>
      <div className='details-wrap'>
        <p className='pricing'>$ {product.price}</p>
        <p className='discount'>{product.discount > 0 && `${product.discount}% discount`}</p>

        <div className='quantity'>
          <label className="quantity-label">Quantity</label>
          <input type="number" className="quantity-input" value={product.quantity} onChange={(e) => onQuantityChange(e,{...product})}/>
        </div>
      </div>
    </div>

    <div>
      <p className='desc-label'>Description</p>
      <p className='desc'>{product.description}</p>
    </div>

  </div>
  )
}

export default ProductList