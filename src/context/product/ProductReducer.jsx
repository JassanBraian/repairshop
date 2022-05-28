import { GET_PRODUCTS } from "../../actions";

export function ProductReducer(provider, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...provider,
                products: [...action.payload]
            }
        default:
            return provider;
    }
};

export default ProductReducer;