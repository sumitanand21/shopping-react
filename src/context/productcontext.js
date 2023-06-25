import { createContext, useEffect,useContext,useReducer } from 'react';
import axios from "axios";
import reducer from "../reducer/productReducer";
import { actionType } from '../constants/home.constants'

const AppContext = createContext();
const PRODUCTS_API = "./files/products.json";
const CATEGORIES_API = "./files/categories.json";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    categories:[],
    isCategoryLoading: false,
    isCategoryError: false,
  };

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const getProducts = async (url) => {
        dispatch({type: actionType.setLoading});
        try {
            const res = await axios.get(url);
            const products = await res.data;
            dispatch({type: actionType.setAPIProducts, payload: products});
        } catch (error) {
            dispatch({type: actionType.apiError});
        }
    };

    const getCategories = async (url) => {
        dispatch({type: actionType.setCategoriesLoading});
        try {
            const res = await axios.get(url);
            const categories = await res.data;
            dispatch({type: actionType.setAPICategories, payload: categories});
        } catch (error) {
            dispatch({type: actionType.apiErrorCategories});
        }
    };

    useEffect(() => {
        getProducts(PRODUCTS_API);
        getCategories(CATEGORIES_API);
    },[]);
    return (
    <AppContext.Provider value={{...state }}>
      {children}
    </AppContext.Provider>
    )
};

// custom hooks
export const useProductContext = () => {
    return useContext(AppContext);
};

export { AppProvider };
