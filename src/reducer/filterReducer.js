import { actionType } from '../constants/home.constants';

const filterReducer = (state, action) => {
  const { filter_products, all_products, sorting_value } = state;
    switch (action.type) {
      case actionType.loadFilterProducts:
        let priceArr = action.payload.map((curElem) => curElem.price);
  
        let maxPrice = Math.max(...priceArr);
  
        return {
          ...state,
          filter_products: [...action.payload],
          all_products: [...action.payload],
          filters: { ...state.filters, maxPrice, price: maxPrice },
        };

      case actionType.setQuantity:
        let tempAllProduct = [...all_products];
        let tempFilterProducts = [...filter_products];
        tempAllProduct.forEach((curItem) => {
          if(curItem.id === action.payload.id){
            curItem.quantity = action.payload.quantity;
          }
        });
        tempFilterProducts.forEach((curItem) => {
          if(curItem.id === action.payload.id){
            curItem.quantity = action.payload.quantity;
          }
        });
        return {
          ...state,
          filter_products: [...tempFilterProducts],
          all_products: [...tempAllProduct]
        };
  
      case actionType.getSortValue:
        return {
          ...state,
          sorting_value: action.payload,
        };
  
      case actionType.sortingProducts:
        let newSortData;
        let tempSortProduct = [...filter_products];
  
        const sortingProducts = (a, b) => {
          if (sorting_value === "lowest") {
            return a.price - b.price;
          }
  
          if (sorting_value === "highest") {
            return b.price - a.price;
          }
  
          if (sorting_value === "a-z") {
            return a.title.localeCompare(b.title);
          }
  
          if (sorting_value === "z-a") {
            return b.title.localeCompare(a.title);
          }

          if (sorting_value === "discount") {
            return b.discount - a.discount;
          }
        };
  
        newSortData = tempSortProduct.sort(sortingProducts);
  
        return {
          ...state,
          filter_products: newSortData,
        };
  
      case actionType.updateFilterValue:
        const { name, value } = action.payload;
  
        return {
          ...state,
          filters: {
            ...state.filters,
            [name]: value,
          },
        };
  
      case actionType.filterProducts:
        let tempFilterProduct = [...all_products];
  
        const { searchVal, category, price } = state.filters;

        if (searchVal) {
          let tempSearch = searchVal ? searchVal.toString().toLowerCase() : '';
          tempFilterProduct = tempFilterProduct.filter((curElem) => {
            return curElem.title.toLowerCase().includes(tempSearch);
          });
        }
  
        if (category !== "all") {
          tempFilterProduct = tempFilterProduct.filter(
            (curElem) => curElem.category === category
          );
        }
  
        if (price === 0) {
          tempFilterProduct = tempFilterProduct.filter(
            (curElem) => curElem.price === price
          );
        } else {
          tempFilterProduct = tempFilterProduct.filter(
            (curElem) => curElem.price <= price
          );
        }
        return {
          ...state,
          filter_products: tempFilterProduct,
        };
  
      case actionType.clearFilters:
        return {
          ...state,
          filters: {
            ...state.filters,
            searchVal: "",
            category: "all",
            price: state.filters.maxPrice,
          },
        };
  
      default:
        return state;
    }
  };
  
  export default filterReducer;
  