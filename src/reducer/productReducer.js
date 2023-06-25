import { actionType } from '../constants/home.constants';

const ProductReducer = (state, action) => {
    switch (action.type) {
        case actionType.setLoading:
          return {
            ...state,
            isLoading: true,
          };
    
        case actionType.setAPIProducts:
          return {
            ...state,
            isLoading: false,
            isError: false,
            products: action.payload,
          };
    
        case actionType.apiError:
          return {
            ...state,
            isLoading: false,
            isError: true,
          };

          case actionType.setCategoriesLoading:
            return {
              ...state,
              isCategoryLoading: true,
            };
      
          case actionType.setAPICategories:
            return {
              ...state,
              isCategoryLoading: false,
              isCategoryError: false,
              categories: action.payload,
            };
      
          case actionType.apiErrorCategories:
            return {
              ...state,
              isCategoryLoading: false,
              isCategoryError: true,
            };

        default:
          return state;
      }
};

export default ProductReducer;