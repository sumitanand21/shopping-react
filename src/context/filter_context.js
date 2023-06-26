import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filterReducer";
import { actionType } from '../constants/home.constants'

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  sorting_value: "lowest",
  filters: {
    searchVal: "",
    category: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // sorting function
  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: actionType.getSortValue, payload: userValue });
  };

  // get Product Item for quantity  update
  const onQuantityChange = (event,product) => {
    let userValue = event.target.value;
    product.quantity = userValue; 
    dispatch({ type: actionType.setQuantity, payload: product });
  }

  // update the filter values
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = isNaN(event.target.value) ? event.target.value : +event.target.value;
    if(name === "searchVal" && !value){
      value = "";
    }
    if(name === "category" && value !== 'all' && state.sorting_value === 'discount'){
      dispatch({ type: actionType.getSortValue, payload: "lowest" });
    }
    return dispatch({ type: actionType.updateFilterValue, payload: { name, value } });
  };

  // to clear the filter
  const clearFilters = () => {
    dispatch({ type: actionType.clearFilters });
  };

  // to sort and filter the product
  useEffect(() => {
    dispatch({ type: actionType.filterProducts });
    dispatch({ type: actionType.sortingProducts });
  }, [products, state.sorting_value, state.filters]);

  // to load all the products for grid
  useEffect(() => {
    dispatch({ type: actionType.loadFilterProducts, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        sorting,
        updateFilterValue,
        onQuantityChange,
        clearFilters
      }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
