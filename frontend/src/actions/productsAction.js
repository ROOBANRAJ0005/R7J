import { productsRequest, productsSuccess, productsFailed } from "../slices/ProductsSlice";
import axios from 'axios';

export const getProducts = (currentPage,keyword,price,category,rating) => async (dispatch) => {
    try {
        dispatch(productsRequest());
        
        let link = `/api/v1/products?page=${currentPage}`;
        
        if (keyword) {
            link += `&keyword=${keyword}`;
        }
        if(price){
             link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
         if(category) {
            link += `&category=${encodeURIComponent(category)}`
        }

        if(rating){
            link += `&ratings=${rating}`;
        }

        const { data } = await axios.get(link);
        
        dispatch(productsSuccess({
            products: data.products,
            productsCount: data.count,
            resPerPage: data.resPerPage,
            filteredProductsCount: data.filteredProductsCount
        }));
        
    } catch (error) {
        dispatch(productsFailed(error.response?.data?.message || error.message));
    }
}

